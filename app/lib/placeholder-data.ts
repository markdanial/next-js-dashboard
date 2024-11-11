// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
import { v4 as uuidv4 } from 'uuid';

const users = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    image_url: '/users/john-doe.png',
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    image_url: '/users/jane-smith.png',
  },
  {
    id: uuidv4(),
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    image_url: '/users/alice-johnson.png',
  },
  {
    id: uuidv4(),
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    image_url: '/users/bob-brown.png',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const listings = [
  {
    id: uuidv4(),
    title: "CR Lady Commander Brienne",
    breed: ["Draft Horse Cross"],
    gender: "Mare",
    foaled: "JAN 2011",
    height: "15.0 hh",
    weight: "1,000 pounds",
    color: "Black",
    markings: "Star, snip, stripe",
    temperament: 3,
    registered: true,
    reg_association: "NADHR",
    reg_number: "NAP-100007",
    location: "Monroe, North Carolina, USA",
    price: 15000, // Changed to number for consistency
    negotiable: true,
    for_sale: true,
    for_lease: false,
    category: "For Sale",
    user_id: users[0].id, // Assuming the first user is the seller
    created_at: new Date('2023-01-01T10:00:00Z'),
    updated_at: new Date('2023-01-01T10:00:00Z'),
    images: [
      "https://www.dreamhorse.com/photos/spotlights/2280781s-01.jpg",
      "https://www.dreamhorse.com/photos/oct/2280781-01.jpg",
      "https://www.dreamhorse.com/photos/oct/2280781-02.jpg",
      "https://www.dreamhorse.com/photos/oct/2280781-03.jpg",
      "https://www.dreamhorse.com/photos/oct/2280781-04.jpg"
    ],
    description: "CR Lady Commander Brienne is a 2011 Draft Horse Cross Mare. She is 15 hands and weighs 1,000 pounds. She is black with star, snip, and stripe markings. She is registered with NADHR and has the reg number NAP-100007. She is located in Monroe, North Carolina, USA and is priced at $15,000 USD. She is negotiable and for sale."
  },
  {
    id: uuidv4(),
    title: "Bravo! Over 1 hour video. Super safe, broke vetted",
    breed: ["AQHA Quarter Horse"],
    gender: "Gelding",
    foaled: "MAY 2013",
    height: "15.0 hh",
    weight: "1,050 pounds",
    color: "Bay",
    temperament: 1,
    registered: false,
    location: "Westminster, South Carolina, USA",
    price: 8500, // Changed to number for consistency
    negotiable: false,
    for_sale: true,
    for_lease: false,
    category: "For Sale",
    user_id: users[0].id, // Assuming the first user is the seller
    created_at: new Date('2023-02-15T12:00:00Z'),
    updated_at: new Date('2023-02-15T12:00:00Z'),
    images: [
      "https://www.dreamhorse.com/photos/spotlights/2274087s-01.jpg",
      "https://www.dreamhorse.com/photos/jun/2274087-01.jpg",
      "https://www.dreamhorse.com/photos/jun/2274087-02.jpg",
      "https://www.dreamhorse.com/photos/jun/2274087-03.jpg",
      "https://www.dreamhorse.com/photos/jun/2274087-04.jpg",
      "https://www.dreamhorse.com/photos/jun/2274087-05.jpg",
      "https://www.dreamhorse.com/photos/jun/2274087-06.jpg"
    ],
    description: "Bravo is a 2013 Bay Quarter Horse gelding, standing at 15 hands. He is calm, safe, and suitable for beginners, children, and advanced riders alike. He goes both English and Western, can be ridden bridleless, and is sound and barefoot with no vices. A vet check is available, and videos over an hour long can be provided. Located in Westminster, SC, but shipping can be arranged."
  },
  {
    id: uuidv4(),
    title: "Alberta",
    breed: ["Percheron", "AQHA Quarter Horse"],
    gender: "Filly",
    foaled: "FEB 2020",
    height: "15.3 hh",
    weight: "1,150 pounds",
    color: "Grey",
    temperament: 2,
    registered: false,
    location: "Millwood, Virginia, USA",
    price: 20000, // Changed to number for consistency
    negotiable: false,
    for_sale: true,
    for_lease: false,
    category: "For Sale",
    user_id: users[0].id, // Assuming the first user is the seller
    created_at: new Date('2023-03-10T14:30:00Z'),
    updated_at: new Date('2023-03-10T14:30:00Z'),
    images: [
      "https://www.dreamhorse.com/photos/spotlights/2262818s-01.jpg",
      "https://www.dreamhorse.com/photos/nov/2262818-01.jpg"
    ],
    description: "Alberta is a 4-year-old Percheron/AQHA/TB filly standing at 15.3 hands. She has a wonderful disposition, is easy to work with and ride, and excels in various disciplines, particularly the hunter division. Alberta is balanced and exceptional over fences, making her a promising junior hunter."
  }
];

export { users, customers, invoices, revenue, listings };
