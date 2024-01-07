const Attribute = require("../Model/Attribute");

exports.CreateAttribute = async (req, res, next) => {
  try {
    const { name, attribute_id } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, status: 400, message: "Name is required" });
    }
    let exists;
    if (attribute_id) {
      exists = await Attribute.exists({
        $and: [{ name }, { attribute_id }],
      });
    } else {
      exists = await Attribute.exists({ name });
    }
    if (exists) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Attribute already exists",
      });
    }
    const attribute = await Attribute.create({
      name,
      attribute_id,
    });
    res.status(201).json({
      success: true,
      status: 201,
      message: " Attribute created successfully",
      data: attribute,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.GetAttributes = async (req, res, next) => {
  try {
    const attributes = await Attribute.find().populate("attribute_id").lean();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Attributes fetched Successful",
      data: attributes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.UpdateAttribute = async (req, res, next) => {
  const { id } = req.params;
  const { name, values } = req.body;

  try {
    const tempObject = {};
    if (name) {
      const exists = await Attribute.exists({ name });
      if (exists) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Attribute already exists",
        });
      }
      tempObject.name = name;
    }
    if (values) {
      tempObject.values = values;
    }

    const attribute = await Attribute.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    if (!attribute) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Attribute Not Found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Attribute updated successfully",
      data: attribute,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

exports.DeleteAndRecoverAttribute = async (req, res, next) => {
  try {
    const id = req.params.id;

    const attribute = await Attribute.findByIdAndUpdate(
      id,
      { is_deleted: req.body.is_deleted },
      { new: true }
    );
    if (!attribute) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "attribute not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Attribute ${attribute.is_deleted ? "Delete" : "Recover"
        } Successful`,
      data: attribute,
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



