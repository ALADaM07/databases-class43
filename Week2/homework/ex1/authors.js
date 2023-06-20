require('dotenv').config();
const db = require('./db');
const config = require('../ex1/db-config');

const initializeDatabase = async () => {
  try {
    db.createConnection(config);

    await db.dropDatabaseQuery('homework_2');

    await db.createDatabaseQuery('homework_2');

    await db.useDatabaseQuery('homework_2');

    await db.createTableQuery();

    await db.insertDataToTableQuery();

    await db.alterTableQuery(
      'authors',
      'mentor_id INT',
      'fk_mentor',
      'mentor_id',
      'authors(author_id)'
    );

    db.disconnect();
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

initializeDatabase();
