const User = require("../model/User");
const CryptoJs = require("crypto-js");
const { genAccessToken } = require("./helper/jwttoken");

const router = require("express").Router();

//User registration
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    user.password = CryptoJs.AES.encrypt(
      user.password,
      process.env.SEC_KEY
    ).toString();
    const savedUser = await user.save();
    const accessToken = genAccessToken(savedUser);
    const { password, ...info } = savedUser._doc;
    res.status(201).send({ info, accessToken });
  } catch (err) {
    res.status(500).send("error occure");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    decrypt = CryptoJs.AES.decrypt(user.password, process.env.SEC_KEY);
    originalPassword = decrypt.toString(CryptoJs.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.send("email or password wrong");
    }
    const accessToken = jwtToken.genAccessToken(user);
    const { password, ...info } = user._doc;
    res.status(200).json({ info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
