const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
