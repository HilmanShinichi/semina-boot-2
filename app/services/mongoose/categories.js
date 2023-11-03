const Categories = require("../../api/v1/categories/model");

const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  // cari categories dengan field name
  const check = await Categories.findOne({ name, organizer: req.user.organizer });

  // apabila check true / data categories sudah ada maka kita tampilkan error bad request
  if (check) throw new BadRequestError("Category already exists");

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id, organizer: req.user.organizer  });

  if (!result) {
    throw new NotFoundError(`Category not found id : ${id}`);
  }

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  const check = await Categories.findOne({ name, organizer: req.user.organizer, _id: { $ne: id } });

  // apabila check true / data categories sudah ada maka kita tampilkan error bad request
  if (check) throw new BadRequestError("Category already exists");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  //jika id result false / null maka akan menampilkan error

  if (!result) {
    throw new NotFoundError(`Category not found id : ${id}`);
  }

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id, organizer: req.user.organizer });

  if (!result) {
    throw new NotFoundError(`Category not found id : ${id}`);
  }

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });
  if (!result) {
    throw new NotFoundError(`Category not found id : ${id}`);
  }

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
