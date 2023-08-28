require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
  NODE_ENV = 'production',
  JWT_SECRET = 'production_secret',
  JWT_DEV = 'dev_secret',
} = process.env;

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3000',
  'http://127.0.0.1:3000',
  'mesto.ashmelkov.nomoredomainsicu.ru',
  'https://github.com/',
];

module.exports = {
  PORT,
  MONGODB_URL,
  NODE_ENV,
  JWT_SECRET,
  JWT_DEV,
  allowedCors,
};
