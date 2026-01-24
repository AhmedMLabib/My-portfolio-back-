const skillsModel = require("../models/skills.model");

exports.createSkill = async (req, res) => {
  try {
    const skill = await skillsModel.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await skillsModel.find({});
    res.status(201).json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editSkills = async (req, res) => {
  try {
    const skill = await skillsModel.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const delProduct = await skillsModel
      .deleteOne({ _id: req.body._id })
      .then((result) => {
        res.status(202).json({ result });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
