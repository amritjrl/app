const express = require("express");
const router = require("./router/router");
const login = require("./router/login");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const createError = require("http-errors");
const app = express();
const con = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
//routing users
app.use("/api/users", router);
app.use("/", login);

app.listen(process.env.PORT, () =>
  console.log(`Server is running at ${process.env.PORT}`)
);
