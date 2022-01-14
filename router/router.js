const router = require("express").Router();
const { application } = require("express");
const User = require("../model/User");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const con = mongoose.connect(process.env.MONGO_URL);

//create user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send("error occure");
  }
});
//get all users
router.get("/", async (req, res) => {
  try {
    const alluser = await User.find();
    res.status(200).send(alluser);
  } catch (err) {
    res.status(500).send("somthing went wrong");
  }
});
//get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("somthing went wrong");
  }
});
//UPDATE USER BY PARAMS ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
