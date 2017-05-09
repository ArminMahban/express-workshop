import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

import apiRouter from './router';

const debug = require('debug')('app:server');

// DB Setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expressworkshop');
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enables static assets from folder static
app.use(express.static('static'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);

app.get('/err', (req, res, next) => {
  const error = new Error('woops!');
  error.status = 500;
  next(error);
});

app.use((err, req, res, next) => {
  debug(`Error\n${err.stack}`);
  res.status(err.status || 500).json({ err });
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
