const homeModel = require("../models/home.model");
const cloudinary = require("cloudinary").v2;

exports.editHome = async (req, res) => {
  try {
    let existData = await homeModel.findOne();

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
    let homeData;
    if (existData) {
      homeData = await homeModel.findOneAndUpdate(
        {},
        { ...req.body, image: imageURL, imagePublicId },
        { new: true },
      );
    } else {
      homeData = await homeModel.create({
        ...req.body,
        image: imageURL,
        imagePublicId,
      });
    }
    res.status(201).json(homeData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHomeData = async (req, res) => {
  try {
    const data = await homeModel.findOne();
    res.status(202).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
