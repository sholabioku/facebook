const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { readdirSync } = require('fs');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

app.use(cors());

readdirSync('./routes').map((route) =>
  app.use('/', require(`./routes/${route}`))
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
