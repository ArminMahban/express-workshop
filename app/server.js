import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';

import apiRouter from './router';

// DB Setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cs52poll');
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static('static'));
// enables static assets from folder static
app.set('views', path.join(__dirname, '../app/views'));
// this just allows us to render ejs from the ../app/views directory

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// default index route
app.get('/', (req, res) => {
  res.send('hi');
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);

app.use((err, req, res) => {
  res.status(500).json({ err });
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
