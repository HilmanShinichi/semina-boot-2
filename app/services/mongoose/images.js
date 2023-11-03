const Images = require("../../api/v1/images/model");
const  { NotFoundError } = require("../../errors");

/**
 * 1. kita gunain cara ini
 * 2. generate url setelah submit baru kita simpan images
 *
 **/

// * 2. generate url setelah submit baru kita simpan images
const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

//  * 1. kita gunain cara ini
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.jpg",
  });

  return result;
};

const chekingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`Image not found id : ${id}`);
  }
  return result;
};

module.exports = {
  createImages,
  generateUrlImage,
  createImages,
  chekingImage,
};
