const { Client } = require('pg');
require("dotenv").config();
const pgPassword = process.env.PG_PASSWORD;

const client = new Client({
  connectionString: `postgres://morqftzh:${pgPassword}@jelani.db.elephantsql.com/morqftzh`
});

const sampleData = [
  {
    id: 1,
    name: 'Product A',
    description: 'This is product A',
    price: 10.99,
    status: 'active'
  },
  {
    id: 2,
    name: 'Product B',
    description: 'This is product B',
    price: 20.99,
    status: 'active'
  },
  {
    id: 3,
    name: 'Product C',
    description: 'This is product C',
    price: 30.99,
    status: 'deleted'
  }
];

const query = `
  INSERT INTO products (id, name, description, price, status)
  VALUES ($1, $2, $3, $4, $5)
`;

async function seedData() {
  await client.connect();

  for (const data of sampleData) {
    await client.query(query, [data.id, data.name, data.description, data.price, data.status]);
    console.log('Data inserted successfully');
  }

  await client.end();
}

seedData();