import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';
// import { UpdateListing, DeleteListing } from '@/app/ui/invoices/buttons';
import { formatCurrency } from '@/app/lib/utils';
import { fetchListings } from '@/app/lib/data';
import { listings as placeholderListings } from '@/app/lib/placeholder-data';

export default async function ListingsCards({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  let listings;
  try {
    listings = await fetchListings(query);
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    // listings = placeholderListings;
  }
console.log('listings.breeds', listings?.[0]?.breeds);
  return (
    <div className="mt-6 flow-root">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings?.map((listing) => (
            <div key={listing.id} className="flex h-full flex-col rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="h-20 w-20 flex-shrink-0">
                  {listing.images && listing.images[0] ? (
                    <Image
                      src={listing.images[0]}
                      className="h-full w-full rounded-lg object-cover"
                      width={80}
                      height={80}
                      alt={`${listing.title}'s picture`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                      <PhotoIcon className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate">{listing.title}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {listing.breeds.map((breed: { name: string }) => breed.name).join(', ')}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{listing.location}</p>
                </div>
              </div>
              
              <div className="mt-4 flex-1 space-y-2">
                <div className="flex justify-between">
                  <p className="text-xl font-medium">
                    {formatCurrency(listing.price)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {listing.negotiable && 'Negotiable'}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {listing.for_sale ? 'For Sale' : ''} 
                  {listing.for_lease ? (listing.for_sale ? ' & Lease' : 'For Lease') : ''}
                </p>
                
                <div className="space-y-1 text-sm">
                  <p>Gender: {listing.gender}</p>
                  <p>Foaled: {listing.foaled}</p>
                  <p>Height: {listing.height}</p>
                  <p>Color: {listing.color}</p>
                  {listing.registered && (
                    <p>Registered: {listing.reg_association} #{listing.reg_number}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
