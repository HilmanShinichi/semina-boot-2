const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      default: "-",
    },
    // untuk membuat relasi pada mongodb kita perlu membuat Object Id
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Talent", talentSchema);
