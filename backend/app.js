require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');
const router = require('./routes');
const { login, logout, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./utils/errors');
const { signUp, signIn } = require('./utils/routerValidations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGODB_URL } = require('./env');

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connected to ${MONGODB_URL}`);
  })
  .catch(
    (err) => new Error(`Impossible connect to DB ${err.name}: ${err.message}`),
  );

const app = express();

const corsOptions = {
  // git test faild with CORS thats why i used *
  // origin: (origin, callback) => {
  //   if (allowedCors.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  // methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  origin: '*',
  methods: '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrate(signUp), createUser);
app.post('/signin', celebrate(signIn), login);
app.get('/logout', logout);
app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars, max-len
app.use((err, _req, res, _next) => {
  // _next обязательно нужно указать 4 параметр что бы ошибки заработали
  handleErrors(err, res);
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
