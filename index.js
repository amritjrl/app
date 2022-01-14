const express = require("express");
const router = require("./router/router");
const env = require("dotenv").config();
const app = express();

app.use(express.json());
//routing users
app.use("/api/users", router);

app.listen(process.env.PORT, () =>
  console.log(`Server is running at ${process.env.PORT}`)
);
