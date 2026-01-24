const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.mid");
const homeController = require("../controllers/home.controller");
const auth = require("../middlewares/auth.mid");
router.post("/", auth.authMW, upload.single("image"), homeController.editHome);
router.get("/", homeController.getHomeData);

module.exports = router;
