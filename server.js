const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
require('./config/database');
const cors = require('cors');
const morgan = require('morgan');


//controllers
const trackRoute = require('./controllers/trackRoute');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes go here

app.use('/tracks', trackRoute);

app.listen(3000, () => {
  console.log('The express app is ready!');
});