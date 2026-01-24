const projectsModel = require("../models/projects.model");
const cloudinary = require("cloudinary").v2;

const fs = require("fs");
exports.createProject = async (req, res) => {
  try {
    imageURL = null;
    imagePublicId = null;
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const uploadImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        stream.end(imageBuffer);
      });

      imageURL = uploadImage.secure_url;
      imagePublicId = uploadImage.public_id;
    }
    const project = await projectsModel.create({
      ...req.body,
      image: imageURL,
      imagePublicId,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await projectsModel.find({});
    res.status(201).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editProject = async (req, res) => {
  try {
    let existData = await projectsModel.findById(req.body._id);

    if (existData) {
      if (req.file && existData.imagePublicId) {
        await cloudinary.uploader.destroy(existData.imagePublicId);
      }
    }
    let imageURL = null;
    let imagePublicId = null;
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const uploadImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        stream.end(imageBuffer);
      });

      imageURL = uploadImage.secure_url;
      imagePublicId = uploadImage.public_id;
    }

    const project = await projectsModel.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: { ...req.body, image: imageURL, imagePublicId },
      },
      { new: true },
    );
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let existData = await projectsModel.findById(req.body._id);
    if (existData) {
      if (existData.imagePublicId) {
        await cloudinary.uploader.destroy(existData.imagePublicId);
      }
    }
    await projectsModel.deleteOne({ _id: req.body._id }).then((result) => {
      res.status(202).json({ result });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
