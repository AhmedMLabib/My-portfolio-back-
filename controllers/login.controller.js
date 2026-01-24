const loginModel = require("../models/login.model");
const hashing = require("../middlewares/hashing.mid");
const auth = require("../middlewares/auth.mid");
exports.createUser = async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const hashedPassword = await hashing.hashPassword(password);
    const user = await loginModel.create({
      email,
      password: hashedPassword,
      userType,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginModel.findOne({ email });
    if (user) {
      const isMatch = await hashing.compare(password, user.password);
      if (isMatch) {
        const token = auth.createToken({
          userType: user.userType,
        });
        res.status(200).json({ "access token": token });
      } else {
        res.status(400).json({ "not found": "password is not correct" });
      }
    } else {
      res.status(400).json({ "not found": "email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
