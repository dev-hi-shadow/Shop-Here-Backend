const Role = require("../Model/Role");

exports.RoleCreate = async (req, res, next) => {
  try {
    const { name } = req.body;
    const exists = await Role.exists({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, status: 400, message: "Role already exists" });
    }
    const role = await Role.create({ name });
    res.status(201).json({
      success: true,
      status: 200,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

exports.GetRole = async (req, res, next) => {
  try {
    const role = await Role.find().lean();
    res.status(200).json({
      success: true,
      status: 200,
      message: "role fetched successfully",
      data: role,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
};

exports.UpdateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, } = req.body;
    const tempObject = {};
    if (name) {
      const exists = await Role.exists({ name });
      if (exists) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Role already exists",
        });
      }
      tempObject.name = name;
    }
   
    const role = await Role.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    res.status(200).json({
      success: true,
      status: 200,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
};

exports.DeleteAndRecoverRole = async (req, res, next) => {
  try {
    const id = req.params.id;

    const exists = await Role.findById(id);
    const role = await Role.findByIdAndUpdate(
      id,
      { is_deleted: !exists.is_deleted },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "role not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Role ${role.is_deleted ? "Delete" : "Recover"}  Successful`,
      data: role,
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
