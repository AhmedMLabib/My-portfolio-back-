const mongoose = require("mongoose");
const projectsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    link: { type: String, required: true },
    isActive: {
      type: Boolean,
      required: true,
    },
    imagePublicId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("project", projectsSchema);
