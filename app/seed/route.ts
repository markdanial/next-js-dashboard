import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users, listings } from '../lib/placeholder-data';
import { v4 as uuidv4 } from 'uuid';

export async function createListingsTable() {
  try {
    const client = await db.connect();
    
    // Create the listings table
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS listings (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        breed VARCHAR(255)[],
        gender VARCHAR(50),
        foaled VARCHAR(50),
        height VARCHAR(50),
        weight VARCHAR(50),
        color VARCHAR(50),
        markings TEXT,
        temperament INTEGER,
        registered BOOLEAN DEFAULT false,
        reg_association VARCHAR(100),
        reg_number VARCHAR(100),
        location VARCHAR(255),
        price INTEGER NOT NULL,
        negotiable BOOLEAN DEFAULT false,
        for_sale BOOLEAN DEFAULT true,
        for_lease BOOLEAN DEFAULT false,
        category VARCHAR(100),
        description TEXT NOT NULL,
        images TEXT[],
        user_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;
    
    return { message: 'Listings table created successfully' };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An error occurred creating listings table.');
  }
}

export async function GET() {
  try {
    await createListingsTable();
    return Response.json({ message: 'Listings table created successfully' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
