const Tax = require("../Model/Tax");

exports.TaxCreate = async (req, res, next) => {
  try {
    const { name, value } = req.body;
    const exists = await Tax.exists({ $or: [{ name }, { value }] });
    if (exists) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Tax name or code already exists",
      });
    }
    const tax = await Tax.create({ name, value });
    res.status(201).json({
      success: true,
      status: 200,
      message: "Tax created successfully",
      data: tax,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

exports.GetTax = async (req, res, next) => {
  try {
    const tax = await Tax.find().lean();
    res.status(200).json({
      success: true,
      status: 200,
      message: "tax fetched successfully",
      data: tax,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
};

exports.UpdateTax = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, value } = req.body;
    const tempObject = {};

    const tax = await Tax.findByIdAndUpdate(
      id,
      { name, value },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      status: 200,
      message: "Tax updated successfully",
      data: tax,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
};

exports.DeleteAndRecoverTax = async (req, res, next) => {
  try {
    const id = req.params.id;

    const tax = await Tax.findByIdAndUpdate(
      id,
      { is_deleted: req.body.is_deleted },
      { new: true }
    );
    if (!tax) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "tax not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Tax ${tax.is_deleted ? "Delete" : "Recover"}  Successful`,
      data: tax,
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
