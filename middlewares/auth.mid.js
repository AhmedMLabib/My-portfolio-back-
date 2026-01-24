const jwt = require("jsonwebtoken");
const secretKey =
  process.env.JWT_SECRET

exports.createToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "1h" });
};

exports.authMW = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(402).json({ error: "access denied token missing" });
    }
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
