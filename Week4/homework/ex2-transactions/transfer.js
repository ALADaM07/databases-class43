const { MongoClient } = require('mongodb');

const transfer = async (fromAccountNumber, toAccountNumber, amount, remark) => {
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

    const session = client.startSession();

    try {
      session.startTransaction();

      const fromAccount = await collection.findOne(
        { account_number: fromAccountNumber },
        { session }
      );
      const toAccount = await collection.findOne(
        { account_number: toAccountNumber },
        { session }
      );

      if (!fromAccount || !toAccount) {
        throw new Error('One or more accounts not found.');
      }

      if (fromAccount.balance < amount) {
        throw new Error('Insufficient balance in the from account.');
      }

      const updatedFromBalance = fromAccount.balance - amount;
      const updatedToBalance = toAccount.balance + amount;

      const timestamp = new Date();

      await collection.updateOne(
        { _id: fromAccount._id },
        {
          $set: { balance: updatedFromBalance },
          $push: {
            account_changes: {
              change_number: fromAccount.account_changes.length + 1,
              amount: -amount,
              changed_date: timestamp,
              remark,
            },
          },
        },
        { session }
      );

      await collection.updateOne(
        { _id: toAccount._id },
        {
          $set: { balance: updatedToBalance },
          $push: {
            account_changes: {
              change_number: toAccount.account_changes.length + 1,
              amount,
              changed_date: timestamp,
              remark,
            },
          },
        },
        { session }
      );

      await session.commitTransaction();
      console.log('Money transferred successfully.');
    } catch (error) {
      await session.abortTransaction();
      console.error('Error transferring money:', error);
    } finally {
      session.endSession();
    }
  } catch (e) {
    console.error('Error connecting to MongoDB Atlas:', e);
  } finally {
    client.close();
    console.log('Database connection closed.');
  }
};

module.exports = { transfer };
