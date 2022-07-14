const express = require("express");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.listen(5000, () =>
  console.log(`Server running at port http://localhost:${PORT}/`)
);
