import Form from '@/app/ui/invoices/create-listing-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Listings', href: '/dashboard/listings' },
          {
            label: 'Create Listing',
            href: '/dashboard/listings/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}