const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/about.controller");
const upload = require("../middlewares/multer.mid");
const auth = require("../middlewares/auth.mid");
router.post(
  "/",
  auth.authMW,
  upload.single("image"),
  aboutController.editAbout,
);
router.get("/", aboutController.getAboutData);

module.exports = router;
