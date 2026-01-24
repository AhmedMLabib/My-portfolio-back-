const express = require("express");
const router = express.Router();
const skillsController = require("../controllers/skills.controller");
const auth = require("../middlewares/auth.mid");
router.post("/", auth.authMW, skillsController.createSkill);
router.patch("/", auth.authMW, skillsController.editSkills);
router.delete("/", auth.authMW, skillsController.deleteById);

router.get("/", skillsController.getSkills);
module.exports = router;
