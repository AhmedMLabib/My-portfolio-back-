const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificate.controller");
const upload = require("../middlewares/multer.mid");
const auth = require("../middlewares/auth.mid");
router.post(
  "/",
  auth.authMW,
  upload.single("image"),
  certificateController.createCertificate,
);
router.patch(
  "/",
  auth.authMW,
  upload.single("image"),
  certificateController.editCertificate,
);
router.delete("/", auth.authMW, certificateController.deleteById);

router.get("/", certificateController.getCertificates);
module.exports = router;


