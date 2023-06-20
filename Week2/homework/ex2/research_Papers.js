require('dotenv').config();
const db = require('./db');
const config = require('../ex1/db-config');

const initializeDatabase = async () => {
  try {
    db.createConnection(config);

    await db.useDatabaseQuery('homework_2');

    await db.createTableQuery();

    await db.insertDataToTableQuery();

    db.disconnect();
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

initializeDatabase();
