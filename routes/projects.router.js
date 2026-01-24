const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projects.controller");
const upload = require("../middlewares/multer.mid");
const auth = require("../middlewares/auth.mid");
router.post(
  "/",
  auth.authMW,
  upload.single("image"),
  projectsController.createProject
);
router.patch(
  "/",
  auth.authMW,
  upload.single("image"),
  projectsController.editProject
);
router.delete("/", auth.authMW, projectsController.deleteById);

router.get("/", projectsController.getProjects);
module.exports = router;
