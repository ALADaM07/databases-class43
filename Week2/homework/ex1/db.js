const mysql = require('mysql');
const tableInfo = require('./table-info');

let connection;

const createConnection = (config, error) => {
  const dbConfig = require('./db-config');
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
        console.error(`Error executing ${query}`);
        rej(error);
      } else {
        res(results);
      }
    });
  });
};

const dropDatabaseQuery = async (databaseName) => {
  try {
    const showDatabasesQuery = 'SHOW DATABASES';
    const result = await executeQuery(showDatabasesQuery);
    const databases = result.map((database) => database.Database);

    if (!databases.includes(databaseName)) {
      console.log(
        `${databaseName} database does not exist. Proceeding to the next step.`
      );
      return;
    }

    await executeQuery(`DROP DATABASE ${databaseName}`);
    console.log(`${databaseName} database dropped successfully`);
  } catch (error) {
    console.error(`Error dropping the ${databaseName} database: ${error}`);
  }
};

const createDatabaseQuery = async (database) => {
  try {
    await executeQuery(`CREATE DATABASE IF NOT EXISTS ${database}`);
    console.log(`${database} database created successfully`);
  } catch (error) {
    console.error(`Error creating the ${database} database: ${error}`);
  }
};

const useDatabaseQuery = async (database) => {
  try {
    await executeQuery(`USE ${database}`);
    console.log(`${database} database in use`);
  } catch (error) {
    console.error(`Error using the ${database} database: ${error}`);
  }
};

const createTableQuery = async () => {
  try {
    for (const table of tableInfo) {
      const tableName = table.tableName;
      const data = table.data[0];

      const columnInfo = Object.keys(data).map((key) => {
        let columnType = '';

        if (key === 'author_id') {
          columnType = `${key} INT PRIMARY KEY AUTO_INCREMENT`;
        } else if (typeof data[key] === 'number') {
          columnType = `${key} INT`;
        } else if (typeof data[key] === 'string') {
          columnType = `${key} VARCHAR(237)`;
        } else if (key === 'gender') {
          columnType = `${key} ENUM('male', 'female')`;
        } else if (data[key] instanceof Date) {
          columnType = `${key} DATE`;
        }

        return columnType;
      });

      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnInfo.join(
        ', '
      )});`;
      await executeQuery(createTableQuery);
      console.log(`${tableName} table created successfully!`);
    }
  } catch (error) {
    console.error(`Error creating tables: ${error}`);
    throw error;
  }
};

const alterTableQuery = async (
  tableName,
  column,
  constraint,
  fk = null,
  ref = null
) => {
  try {
    let query = `ALTER TABLE ${tableName} ADD COLUMN ${column}`;
    await executeQuery(query);

    if (fk && ref) {
      query = `ALTER TABLE ${tableName} ADD CONSTRAINT ${constraint} FOREIGN KEY (${fk}) REFERENCES ${ref}`;
      await executeQuery(query);
      console.log(`${tableName} table was altered successfully`);
    }
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log(`${column} column already exists in ${tableName} table`);
    } else {
      console.error(`Error altering table: ${error}`);
      throw error;
    }
  }
};

const insertDataToTableQuery = async () => {
  try {
    for (const table of tableInfo) {
      const tableName = table.tableName;
      const data = table.data;

      for (const row of data) {
        const query = `INSERT INTO \`${tableName}\` SET ?`;

        try {
          await executeQuery(query, row);
          console.log(`Row was inserted successfully into ${tableName} table!`);
        } catch (error) {
          console.error(`Error inserting rows into ${tableName} table:`, error);
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
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
  dropDatabaseQuery,
  createDatabaseQuery,
  useDatabaseQuery,
  createTableQuery,
  alterTableQuery,
  insertDataToTableQuery,
  disconnect,
};
