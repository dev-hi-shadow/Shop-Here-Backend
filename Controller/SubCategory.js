const Categories = require("../Model/Category");
const SubCategories = require("../Model/SubCategory");

exports.CreateSubCategory = async (req, res, next) => {
  const { name, category_id } = req.body;
  try {
    const exists = await SubCategories.findOne({
      $or: [
        { name: name },
        { name: name && name.toLowerCase() },
        { name: name && name.toUpperCase() },
      ],
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Sub SubCategory Already Exists",
      });
    }
    const category_available = Categories.findOne({
      _id: category_id,
      is_publish: true,
      is_deleted: false,
    });
    console.log(" category_available", category_available);
    if (!category_available) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Category Not Available",
      });
    }

    const subcategory = await SubCategories.create({
      name,
      category_id,
    });
    res.status(200).json({
      success: true,
      status: 201,
      message: "Sub SubCategory created successfully",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.GetSubCategory = async (req, res, next) => {
  try {
    const subcategory = await SubCategories.find()
      .populate("category_id")
      .lean();
    res.status(200).json({
      success: true,
      status: 200,
      message: "Sub SubCategory fetched successfully",
      data: subcategory,
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

exports.UpdateSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category_id, is_publish } = req.body;
    const tempObject = {};
    if (name) {
      tempObject.name = name;
    }
    if (category_id) {
      tempObject.category_id = category_id;
    }

    if (typeof is_publish === "boolean") {
      tempObject.is_publish = is_publish;
    }
    const subcategory = await SubCategories.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    res.status(200).json({
      success: true,
      status: 200,
      message: "SubCategory updated successfully",
      data: subcategory,
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

exports.DeleteAndRecoverSubCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const exist = await SubCategories.findById(id);
    const subcategory = await SubCategories.findByIdAndUpdate(
      id,
      { is_deleted: !exist.is_deleted },
      { new: true }
    );
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "SubCategory not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Profile ${
        subcategory.is_deleted ? "Delete" : "Recover"
      }  Successful`,
      data: subcategory,
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
