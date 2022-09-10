const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { readdirSync } = require('fs');

const app = express();
dotenv.config();

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
