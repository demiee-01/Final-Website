const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });
const databaseName = process.env.MONGODB_DB_NAME || 'computer-store';

// Disable TLS validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  console.log('Testing MongoDB connection...');
  console.log('URI:', uri.replace(/:[^:@]+@/, ':****@')); // Hide password
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  try {
    console.log('\nConnecting...');
    await client.connect();
    console.log('✓ Connected successfully!');
    
    console.log('\nListing databases...');
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('Available databases:', dbs.databases.map(db => db.name));
    
    console.log(`\nChecking ${databaseName} database...`);
    const db = client.db(databaseName);
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    if (collections.find(c => c.name === 'laptops')) {
      const count = await db.collection('laptops').countDocuments();
      console.log(`Laptops collection has ${count} documents`);
    } else {
      console.log('Laptops collection does not exist yet');
    }
    
    console.log('\n✓ MongoDB is working correctly!');
    
  } catch (error) {
    console.error('\n✗ Connection failed:', error.message);
    console.error('\nTroubleshooting steps:');
    console.error('1. Check if your IP is whitelisted in MongoDB Atlas Network Access');
    console.error('2. Verify username and password are correct');
    console.error('3. Ensure the cluster is running');
    console.error('4. Try using Node.js v20 instead of v24');
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

testConnection();
