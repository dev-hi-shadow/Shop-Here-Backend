const Brand = require("../Model/Brand");

exports.BrandCreate = async (req, res, next) => {
  try {
    const { name } = req.body;
    const exists = await Brand.exists({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, status: 400, message: "Brand already exists" });
    }
    const brand = await Brand.create({name });
    res.status(201).json({
      success: true,
      status: 200,
      message: "Brand created successfully",
      data: brand,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

exports.GetBrand = async (req, res, next) => {
  try {
    const brand = await Brand.find().lean();
    res.status(200).json({
      success: true,
      status: 200,
      message: "brand fetched successfully",
      data: brand,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
};

exports.UpdateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, verified } = req.body;
    const tempObject = {};
    if (name) {
      const exists = await Brand.exists({ name });
      if (exists) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Brand already exists",
        });
      }
      tempObject.name = name;
    }
    if (typeof verified === "boolean") {
      tempObject.verified = verified;
    }
    const brand = await Brand.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    res.status(200).json({
      success: true,
      status: 200,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
};

exports.DeleteAndRecoverBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
 
     const brand = await Brand.findByIdAndUpdate(
      id,
      { is_deleted: req.body.is_deleted },
      { new: true }
    );
    if (!brand) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "brand not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Brand ${brand.is_deleted ? "Delete" : "Recover"}  Successful`,
      data: brand,
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
