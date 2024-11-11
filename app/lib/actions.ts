'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { createClient } from '@/app/utils/supabase/server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from '@/auth';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Test it out:
  console.log(CreateInvoice);

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create invoices',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export type ListingState = {
  errors?: {
    title?: string[];
    breed?: string[];
    gender?: string[];
    foaled?: string[];
    height?: string[];
    weight?: string[];
    color?: string[];
    markings?: string[];
    temperament?: string[];
    registered?: string[];
    reg_association?: string[];
    reg_number?: string[];
    location?: string[];
    price?: string[];
    negotiable?: string[];
    for_sale?: string[];
    for_lease?: string[];
    category?: string[];
    description?: string[];
    images?: string[];
  };
  message?: string | null;
};

const ListingFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  breed: z.union([
    z.string().transform(str => [str]),
    z.string().array().min(1, { message: 'At least one breed must be selected.' })
  ]),
  gender: z.string().optional(),
  foaled: z.string()
    .transform(str => str === '' ? null : str)
    .optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  color: z.string().optional(),
  markings: z.string().optional(),
  temperament: z.union([
    z.coerce.number().min(1).max(10),
    z.literal('').transform(() => null),
    z.null()
  ]).optional(),
  registered: z.union([z.boolean(), z.string(), z.null()]).default(false),
  reg_association: z.string().nullable().optional(),
  reg_number: z.string().nullable().optional(),
  location: z.string().optional(),
  price: z.string()
    .transform((val) => Math.round(parseFloat(val) * 100)),
  negotiable: z.union([z.boolean(), z.null()]).default(false),
  for_sale: z.union([
    z.boolean(),
    z.string(),
    z.null(),
    z.undefined()
  ]).default(true)
    .transform(val => {
      if (val === 'true' || val === true) return true;
      if (val === 'false' || val === false) return false;
      return true; // default case
    }),
  for_lease: z.union([z.boolean(), z.string(), z.null()]).default(false),
  category: z.string().optional(),
  description: z.string().min(1, { message: 'Description is required.' }),
  images: z.array(z.string()).optional(),
});

export async function createListing(prevState: ListingState, formData: FormData) {
  // Validate form data using the schema
  const validatedFields = ListingFormSchema.safeParse({
    title: formData.get('title'),
    breed: formData.get('breed')?.toString().split(',').filter(Boolean) || [],
    gender: formData.get('gender'),
    foaled: formData.get('foaled'),
    height: formData.get('height'),
    weight: formData.get('weight'),
    color: formData.get('color'),
    markings: formData.get('markings'),
    temperament: formData.get('temperament'),
    registered: formData.get('registered'),
    reg_association: formData.get('regAssociation'),
    reg_number: formData.get('regNumber'),
    location: formData.get('location'),
    price: formData.get('price'),
    negotiable: formData.get('negotiable'),
    for_sale: formData.get('forSale'),
    for_lease: formData.get('forLease'),
    category: formData.get('category'),
    description: formData.get('description'),
    images: formData.get('images')?.toString().split(',').filter(Boolean)
  });

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Listing.',
    };
  }

  const { 
    title, breed, description, temperament, registered, 
    negotiable, for_sale, for_lease, reg_association, 
    reg_number, location, gender, foaled, height, 
    weight, color, markings, category, price, images 
  } = validatedFields.data;

  try {
    const supabase = await createClient();

    // Start a Supabase transaction
    const { data: newListing, error: listingError } = await supabase
      .from('listings')
      .insert([{
        title,
        price,
        description,
        temperament,
        registered,
        negotiable,
        for_sale,
        for_lease,
        reg_association,
        reg_number,
        location,
        gender,
        foaled,
        height,
        weight,
        color,
        markings,
        category
      }])
      .select()
      .single();

    if (listingError) throw listingError;

    // Link breeds - Modified section
    if (breed && breed.length > 0) {
      console.log('Searching for breeds:', breed);
      
      // Get breed IDs
      const { data: breedIds, error: breedLookupError } = await supabase
        .from('breeds')
        .select('id')
        .in('slug', breed);

      if (breedLookupError) throw breedLookupError;
      console.log('Full breed data:', breedIds);

      if (breedIds && breedIds.length > 0) {
        const breedLinks = breedIds.map(({ id }) => ({
          listing_id: newListing.id,
          breed_id: id
        }));

        console.log('Creating breed links:', breedLinks);

        const { data: insertedBreeds, error: breedError } = await supabase
          .from('listing_breeds')
          .insert(breedLinks)
          .select();

        console.log('Inserted breeds response:', insertedBreeds);
        
        if (breedError) {
          console.error('Error linking breeds:', breedError);
          throw breedError;
        }
      }
    }

    // Handle images
    if (images && images.length > 0) {
      const { error: imageError } = await supabase
        .from('listingImages')
        .insert(
          images.map(imageUrl => ({
            listing_id: newListing.id,
            image_url: imageUrl
          }))
        );
      
      if (imageError) throw imageError;
    }

    // Debug: Check listing_breeds table
    const { data: checkBreeds } = await supabase
      .from('listing_breeds')
      .select(`
        *,
        breeds:breed_id (name, slug),
        listings:listing_id (title)
      `)
      .eq('listing_id', newListing.id);
    
    console.log('Database check - listing_breeds:', checkBreeds);

    // Debug: Check listings table
    const { data: checkListing } = await supabase
      .from('listings')
      .select('*')
      .eq('id', newListing.id)
      .single();
    
    console.log('Database check - listing:', checkListing);

    console.log('Created Listing!');
    revalidatePath('/dashboard/listings');
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to create listing' };
  }

  redirect('/dashboard/listings');
}


