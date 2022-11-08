// import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import db from './config/database.config';
import cors from 'cors';

import accountRouter from './routes/accounts';
import withdrawalRoter from './routes/withdrawal';
import transferRouter from './routes/transferAirtime';

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', '../public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);
app.use('/cash', withdrawalRoter);
app.use('/airtime', transferRouter);

db.sync()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database successfully connected 🚀');
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

export default app;
