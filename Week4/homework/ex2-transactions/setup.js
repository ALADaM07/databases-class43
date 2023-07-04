const { MongoClient } = require('mongodb');

const setup = async () => {
  const uri =
    'mongodb+srv://aladam:r1LB4exKBTU3sbYL@cluster0.2yhkkuu.mongodb.net/databaseWeek4?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const dbName = 'databaseWeek4';
  const collectionName = 'accounts';

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas successfully.');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.deleteMany({});

    const accounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [],
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [],
      },
      {
        account_number: 103,
        balance: 7000,
        account_changes: [],
      },
    ];

    await collection.insertMany(accounts);

    console.log('Data setup completed.');
  } catch (e) {
    console.error('Error connecting to MongoDB Atlas:', e);
  } finally {
    client.close();
    console.log('Database connection closed.');
  }
};

module.exports = { setup };
