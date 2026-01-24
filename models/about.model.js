const mongoose = require("mongoose");
const aboutSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    imagePublicId: { type: String },
    text: {
      type: String,
      required: true,
    },
    projectsNumber: {
      type: Number,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("about", aboutSchema);
