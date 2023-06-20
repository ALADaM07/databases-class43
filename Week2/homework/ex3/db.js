const mysql = require('mysql');

let connection;

const createConnection = (config, error) => {
  const dbConfig = require('../ex1/db-config');
  connection = mysql.createConnection(dbConfig);
  if (error) {
    console.error(`Error connecting to the database!!`);
    return;
  }
  console.log(`Connected to the database`);
};

const executeQuery = (query, values = []) => {
  return new Promise((res, rej) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error(`error executing ${query}`);
        rej(error);
      } else {
        res(results);
      }
    });
  });
};
const useDatabaseQuery = async (database) => {
  try {
    await executeQuery(`USE ${database}`);
    console.log(`${database} database in use`);
  } catch (error) {
    console.error(`Error using the ${database} database: ${error}`);
  }
};
const disconnect = () => {
  connection.end((error) => {
    if (error) {
      console.error(`Error disconnecting from the database!!`);
      return;
    }
    console.log(`Disconnected from the database`);
  });
};

module.exports = {
  createConnection,
  executeQuery,
  useDatabaseQuery,
  disconnect,
};
