require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cacheRouter = require('./routes/cache');

app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use('/cache', cacheRouter);

module.exports = app;