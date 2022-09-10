const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const app = express();

app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
