'use client';

import { createListing } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import Typeahead from '@/app/ui/invoices/typeahead';
import { useState, useEffect } from 'react';
import { fetchBreeds } from '@/app/lib/data';

type Breed = {
  id: number;
  name: string;
  slug: string;
};

export default function CreateListingForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(createListing, initialState);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<Breed[]>([]);
console.log('state', state);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const breedsData = await fetchBreeds();
        setBreeds(breedsData.map(breed => ({
          id: breed.id,
          name: breed.name,
          slug: breed.name.toLowerCase().replace(/\s+/g, '-')
        })));
      } catch (error) {
        console.error('Failed to load breeds:', error);
      }
    };
    loadBreeds();
  }, []);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden User ID field */}
        <input
          type="hidden"
          name="user_id"
          value="1" // Replace with actual user ID from your auth system
        />
        
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

        <Typeahead
          options={breeds}
          selectedOptions={selectedBreeds}
          onSelect={(breed) => setSelectedBreeds([...selectedBreeds, breed])}
          onRemove={(breedId) => setSelectedBreeds(selectedBreeds.filter(b => b.id !== breedId))}
          label="Breed(s)"
          placeholder="Type to search breeds..."
          required
          name="breed"
          error={state.errors?.breed?.[0]}
        />

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="mb-2 block text-sm font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
          >
            <option value="">Select gender</option>
            <option value="mare">Mare</option>
            <option value="stallion">Stallion</option>
            <option value="gelding">Gelding</option>
          </select>
        </div>

        {/* Foaling Date */}
        <div className="mb-4">
          <label htmlFor="foaled" className="mb-2 block text-sm font-medium">
            Foaling Date
          </label>
          <input
            type="date"
            id="foaled"
            name="foaled"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
          />
        </div>

        {/* Height and Weight */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="height" className="mb-2 block text-sm font-medium">
              Height
            </label>
            <input
              type="text"
              id="height"
              name="height"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              placeholder="e.g., 16.2 hands"
            />
          </div>
          <div>
            <label htmlFor="weight" className="mb-2 block text-sm font-medium">
              Weight
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              placeholder="e.g., 1200 lbs"
            />
          </div>
        </div>

        {/* Color and Markings */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="color" className="mb-2 block text-sm font-medium">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            />
          </div>
          <div>
            <label htmlFor="markings" className="mb-2 block text-sm font-medium">
              Markings
            </label>
            <input
              type="text"
              id="markings"
              name="markings"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            />
          </div>
        </div>

        {/* Temperament */}
        <div className="mb-4">
          <label htmlFor="temperament" className="mb-2 block text-sm font-medium">
            Temperament (1-10)
          </label>
          <input
            type="number"
            id="temperament"
            name="temperament"
            min="1"
            max="10"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
          />
        </div>

        {/* Add Category field (was missing) */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category*
          </label>
          <select
            id="category"
            name="category"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            required
          >
            <option value="">Select category</option>
            <option value="horse">Horse</option>
            <option value="pony">Pony</option>
            <option value="other">Other</option>
          </select>
          {state.errors?.category && (
            <div className="text-red-500 text-sm">{state.errors.category[0]}</div>
          )}
        </div>

        {/* Registration Details */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="registered"
              name="registered"
              className="mr-2"
              defaultChecked={false}
            />
            <label htmlFor="registered" className="text-sm font-medium">
              Registered
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              id="reg_association"
              name="reg_association"
              placeholder="Registration Association"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            />
            <input
              type="text"
              id="reg_number"
              name="reg_number"
              placeholder="Registration Number"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
          />
        </div>

        {/* Price and Negotiable */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-medium">
                Price (USD)*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
                required
              />
              {state.errors?.price && (
                <div className="text-red-500 text-sm">{state.errors.price[0]}</div>
              )}
            </div>
            <div className="flex items-center mt-8">
              <input
                type="checkbox"
                id="negotiable"
                name="negotiable"
                className="mr-2"
                defaultChecked={false}
              />
              <label htmlFor="negotiable" className="text-sm font-medium">
                Price Negotiable
              </label>
            </div>
          </div>
        </div>

        {/* Listing Type */}
        <div className="mb-4">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="for_sale"
                name="for_sale"
                className="mr-2"
                defaultChecked={true}
              />
              <label htmlFor="for_sale" className="text-sm font-medium">
                For Sale
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="for_lease"
                name="for_lease"
                className="mr-2"
                defaultChecked={false}
              />
              <label htmlFor="for_lease" className="text-sm font-medium">
                For Lease
              </label>
            </div>
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
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter listing description"
            rows={4}
            required
          />
          {state.errors?.description && (
            <div className="text-red-500 text-sm">{state.errors.description[0]}</div>
          )}
        </div>

        {/* Images */}
        <div className="mb-4">
          <label htmlFor="images" className="mb-2 block text-sm font-medium">
            Images
          </label>
          <input
            type="text"
            id="images"
            name="images"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            placeholder="Enter image URLs (comma-separated)"
          />
        </div>

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
