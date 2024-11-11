'use client';

import { createListing } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function CreateListingForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createListing, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title*
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter listing title"
            required
          />
          {state.errors?.title && (
            <div className="text-red-500 text-sm">{state.errors.title[0]}</div>
          )}
        </div>

        {/* Breed Selection */}
        <div className="mb-4">
          <label htmlFor="breed" className="mb-2 block text-sm font-medium">
            Breed(s)*
          </label>
          <select
            id="breed"
            name="breed"
            multiple
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            required
          >
            <option value="thoroughbred">Thoroughbred</option>
            <option value="quarter_horse">Quarter Horse</option>
            <option value="arabian">Arabian</option>
            {/* Add more breed options as needed */}
          </select>
          {state.errors?.breed && (
            <div className="text-red-500 text-sm">{state.errors.breed[0]}</div>
          )}
        </div>

        {/* Basic Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="gender" className="mb-2 block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            >
              <option value="">Select Gender</option>
              <option value="mare">Mare</option>
              <option value="gelding">Gelding</option>
              <option value="stallion">Stallion</option>
            </select>
          </div>

          <div>
            <label htmlFor="foaled" className="mb-2 block text-sm font-medium">
              Foaled (Year)
            </label>
            <input
              id="foaled"
              name="foaled"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              placeholder="YYYY"
            />
          </div>

          <div>
            <label htmlFor="height" className="mb-2 block text-sm font-medium">
              Height
            </label>
            <input
              id="height"
              name="height"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              placeholder="e.g., 16.2 hands"
            />
          </div>
        </div>

        {/* Price and Negotiation */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price*
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            placeholder="Enter price"
            required
          />
          {state.errors?.price && (
            <div className="text-red-500 text-sm">{state.errors.price[0]}</div>
          )}
          
          <div className="mt-2 flex gap-4">
            <label className="flex items-center">
              <input type="checkbox" name="negotiable" className="mr-2" />
              Price Negotiable
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="for_sale" className="mr-2" defaultChecked />
              For Sale
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="for_lease" className="mr-2" />
              For Lease
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            placeholder="Describe your horse..."
            required
          />
          {state.errors?.description && (
            <div className="text-red-500 text-sm">{state.errors.description[0]}</div>
          )}
        </div>

        {/* Registration Details */}
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input type="checkbox" name="registered" className="mr-2" />
            Registered Horse
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="reg_association"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              placeholder="Registration Association"
            />
            <input
              name="reg_number"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              placeholder="Registration Number"
            />
          </div>
        </div>

        {/* Error Message */}
        {state.message && (
          <div className="text-red-500 text-sm mt-2">{state.message}</div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/listings"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Listing</Button>
      </div>
    </form>
  );
}
