const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function checkLaptops() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('computer-store');
    const laptops = await db.collection('laptops').find({}).toArray();
    
    console.log(`\n📊 Found ${laptops.length} laptops:\n`);
    
    laptops.forEach((laptop, index) => {
      console.log(`${index + 1}. ${laptop.name}`);
      console.log(`   Brand: ${laptop.brand}`);
      console.log(`   Image: ${laptop.image}`);
      console.log(`   Price: $${laptop.price}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

checkLaptops();
