const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");
router.post("/register", loginController.createUser);
router.post("/", loginController.login);
module.exports = router;
