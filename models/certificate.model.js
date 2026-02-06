const mongoose = require("mongoose");
const certificateSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    imagePublicId: { type: String },
    certificateName: { type: String, required: true },
    organization: { type: String, required: true },
    certificateURL: { type: String, required: true },
    description: { type: String },
    issueDate: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("certificate", certificateSchema);
