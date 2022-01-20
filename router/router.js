const router = require("express").Router();
const { findByIdAndDelete, findOneAndDelete } = require("../model/User");
const User = require("../model/User");
const env = require("dotenv").config();
const {
  verifyToken,
  verifyAdmin,
  verifyTokenAndAuthorization,
} = require("./helper/jwttoken");

//get all users
router.get("/", verifyToken, async (req, res) => {
  try {
    const alluser = await User.find();
    res.status(200).send(alluser);
  } catch (err) {
    res.status(500).send("somthing went wrong");
  }
});
//get user by id
router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("somthing went wrong");
  }
});
//UPDATE USER BY PARAMS ID
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
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
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const delUser = await User.findByIdAndDelete(req.params.id);
    console.log(delUser);
    res.send("Delete");
  } catch (err) {
    res.status(500).send("server");
  }
});

module.exports = router;
