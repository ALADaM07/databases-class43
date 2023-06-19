require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'hyfuser',
  password: process.env.DB_PASSWORD || 'hyfpassword',
  database: process.env.DB_DATABASE || '',
};
