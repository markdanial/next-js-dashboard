import Image from 'next/image';
// import { UpdateListing, DeleteListing } from '@/app/ui/invoices/buttons';
import { formatCurrency } from '@/app/lib/utils';
import { fetchListings } from '@/app/lib/data';
import { listings as placeholderListings } from '@/app/lib/placeholder-data';

export default async function ListingsTable({
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
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {listings?.map((listing) => (
              <div key={listing.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2">
                      <p className="font-medium">{listing.title}</p>
                      <p className="text-sm text-gray-500">
                        {listing.breeds.map((breed: { name: string }) => breed.name).join(', ')}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{listing.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-medium">
                      {formatCurrency(listing.price)}
                      {listing.negotiable && ' (Negotiable)'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {listing.for_sale ? 'For Sale' : ''} 
                      {listing.for_lease ? (listing.for_sale ? ' & Lease' : 'For Lease') : ''}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
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
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Horse</th>
                <th scope="col" className="px-3 py-5 font-medium">Breed</th>
                <th scope="col" className="px-3 py-5 font-medium">Details</th>
                <th scope="col" className="px-3 py-5 font-medium">Registration</th>
                <th scope="col" className="px-3 py-5 font-medium">Location</th>
                <th scope="col" className="px-3 py-5 font-medium">Price</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {listings?.map((listing) => (
                <tr key={listing.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {listing.images && listing.images[0] && (
                        <Image
                          src={listing.images[0]}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${listing.title}'s picture`}
                        />
                      )}
                      <p>{listing.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {listing.breeds.map((breed: { name: string }) => breed.name).join(', ')}
                  </td>
                  <td className="px-3 py-3">
                    <p>{listing.gender} • {listing.foaled}</p>
                    <p className="text-sm text-gray-500">{listing.height} • {listing.color}</p>
                  </td>
                  <td className="px-3 py-3">
                    {listing.registered ? (
                      <p className="text-sm">{listing.reg_association} #{listing.reg_number}</p>
                    ) : 'Not registered'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {listing.location}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{formatCurrency(listing.price)}</p>
                    <p className="text-sm text-gray-500">
                      {listing.negotiable && 'Negotiable'}
                      {listing.for_sale && ' • For Sale'}
                      {listing.for_lease && ' • For Lease'}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {/* Action buttons commented out */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
