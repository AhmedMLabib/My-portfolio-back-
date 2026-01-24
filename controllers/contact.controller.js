const contactModel = require("../models/contact.model");

exports.editContact = async (req, res) => {
  try {
    const del = await contactModel.deleteMany({});

    const contactData = await contactModel.create(req.body);
    res.status(201).json(contactData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getContactData = async (req, res) => {
  try {
    const data = await contactModel.findOne();
    res.status(202).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
