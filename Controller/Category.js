const Categories = require("../Model/Category");

exports.CreateCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await Categories.findOne({
      $or: [
        { name },
        { name: name && name.toLowerCase() },
        { name: name && name.toUpperCase() },
      ],
    });
    if (category) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }
    const newCategory = await Categories.create({
      name,
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.GetCategory = async (req, res, next) => {
  try {
    const category = await Categories.find().lean();
    res.status(200).json({
      success: true,
      status: 200,
      message: "Categories fetched successful",
      data: category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.UpdateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, is_publish } = req.body;
    const tempObject = {};
    if (name) {
      const exists = await Categories.findOne({
        $or: [
          { name },
          { name: name && name.toLowerCase() },
          { name: name && name.toUpperCase() },
        ],
      });
      if (exists) {
        return res.status(400).json({
          message: "Category already exists",
        });
      }
      tempObject.name = name;
    }

    if (typeof is_publish === "boolean") {
      tempObject.is_publish = is_publish;
    }
    const category = await Categories.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    res.status(200).json({
      success: true,
      status: 200,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.DeleteAndRecoverCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const exists = await Categories.findById(id);
    const category = await Categories.findByIdAndUpdate(
      id,
      { is_deleted: !exists.is_deleted },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Category ${
        category.is_deleted ? "Delete" : "Recover"
      }  Successful`,
      data: category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};
