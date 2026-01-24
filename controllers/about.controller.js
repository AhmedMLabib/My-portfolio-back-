const aboutModel = require("../models/about.model");
const cloudinary = require("cloudinary").v2;

exports.editAbout = async (req, res) => {
  try {
    let existData = await aboutModel.findOne();
    if (existData) {
      if (req.file && existData.imagePublicId) {
        await cloudinary.uploader.destroy(existData.imagePublicId);
      }
    }
    let imageURL = existData?.image || null;
    let imagePublicId = existData?.imagePublicId || null;
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

    let newData = null;
    if (existData) {
      newData = await aboutModel.findOneAndUpdate(
        {},
        {
          ...req.body,
          image: imageURL,
          imagePublicId,
        },
        { new: true },
      );
    } else {
      newData = await aboutModel.create({
        ...req.body,
        image: imageURL,
        imagePublicId,
      });
    }
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAboutData = async (req, res) => {
  try {
    const data = await aboutModel.findOne();
    res.status(202).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
