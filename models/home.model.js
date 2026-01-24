const mongoose = require("mongoose");
const homeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imagePublicId:{type:String, required:true}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("home", homeSchema);
