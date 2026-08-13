const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function cleanLaptops() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('computer-store');
    
    // Delete laptops with ImageKit URLs (the broken ones)
    const result = await db.collection('laptops').deleteMany({
      image: { $regex: /ik\.imagekit\.io/ }
    });
    
    console.log(`🗑️  Deleted ${result.deletedCount} laptop(s) with ImageKit URLs`);
    
    // Show remaining laptops
    const remaining = await db.collection('laptops').find({}).toArray();
    console.log(`\n📊 Remaining laptops: ${remaining.length}\n`);
    
    remaining.forEach((laptop, index) => {
      console.log(`${index + 1}. ${laptop.name} - ${laptop.brand}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

cleanLaptops();
