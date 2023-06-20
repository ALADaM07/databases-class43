require('dotenv').config();
const db = require('./db');
const config = require('../ex1/db-config');

const initializeDatabase = async () => {
  try {
    db.createConnection(config);

    await db.useDatabaseQuery('homework_2');

    const queries = require('./queries');

    for (const queryObject of queries) {
      const { question, query } = queryObject;

      await db
        .executeQuery(query)
        .then((results) => {
          console.log(`Query: ${question}
          --------------------------------------------`);
          console.log(`Results: ${JSON.stringify(results)}
          --------------------------------------------`);
        })
        .catch((error) => {
          console.error(`Error executing query: ${query}`);
          console.error(error);
        });
    }

    db.disconnect();
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

initializeDatabase();
