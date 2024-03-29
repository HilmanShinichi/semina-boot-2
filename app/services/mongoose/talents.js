// import model Talents
const Talents = require("../../api/v1/talents/model");
const { chekingImage } = require("./images");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  // cari image dengan field image
  await chekingImage(image);

  // cari talent dengan field name
  const check = await Talents.findOne({ name, organizer: req.user.organizer });

  // apabila check true / data talent sudah ada maka kita tampilkan error bad request
  if (check) throw new BadRequestError("Talent already exists");

  const result = await Talents.create({
    name,
    image,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!result) {
    throw new NotFoundError(`Talent not found id : ${id}`);
  }

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  // cari talent dengan field name dan id  selain dari yang dikirim dari params
  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // apabila check true / data talent sudah ada maka kita tampilkan error bad request
  if (check) throw new BadRequestError("Talent already exists");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, role, image, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  //jika id result false / null maka akan menampilkan error
  if (!result) {
    throw new NotFoundError(`Talent not found id : ${id}`);
  }

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) {
    throw new NotFoundError(`Talent not found id : ${id}`);
  }

  await result.remove();

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`Talent not found id : ${id}`);
  }

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents,
};
