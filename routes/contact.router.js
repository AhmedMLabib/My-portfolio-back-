const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const auth = require("../middlewares/auth.mid");
router.post("/", auth.authMW, contactController.editContact);
router.get("/", contactController.getContactData);

module.exports = router;
