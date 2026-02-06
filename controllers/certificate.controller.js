const certificateModel = require("../models/certificate.model");
const cloudinary = require("cloudinary").v2;

exports.createCertificate = async (req, res) => {
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
    const certificate = await certificateModel.create({
      ...req.body,
      image: imageURL,
      imagePublicId,
    });
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const certificates = await certificateModel.find({});
    res.status(201).json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editCertificate = async (req, res) => {
  try {
    let existData = await certificateModel.findById(req.body._id);

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

    const certificate = await certificateModel.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: { ...req.body, image: imageURL, imagePublicId },
      },
      { new: true },
    );
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let existData = await certificateModel.findById(req.body._id);
    if (existData) {
      if (existData.imagePublicId) {
        await cloudinary.uploader.destroy(existData.imagePublicId);
      }
    }
    await certificateModel.deleteOne({ _id: req.body._id }).then((result) => {
      res.status(202).json({ result });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
