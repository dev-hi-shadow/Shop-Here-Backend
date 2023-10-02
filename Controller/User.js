const Role = require("../Model/Role");
const User = require("../Model/User");

exports.createUser = async (req, res, next) => {
  const { email, phone, name, password } = req.body;
  try {
    const role_id = await Role.distinct("_id", { name: "USER" });
    const user = await User.create({ email, phone, name, password, role_id });
    const token = await user.GetAuthToken();

    res
      .cookie("token", token, {
        expire: new Date(Date.now + 10800000000),
        httpOnly: true,
      })
      .status(201)
      .json({
        success: true,
        status: 201,
        message: "User registration successful",
        data: user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { credential, password } = req.body;
  try {
    if (!credential || !password) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "please fill all the fields",
      });
    }
    let user;
    if (typeof credential === "string") {
      user = await User.findOne({
        email: credential,
      });
    } else {
      user = await User.findOne({
        phone: credential,
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid credential",
      });
    }
    const isMatch = await user.ComparePassword(password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid credential" });
    }
    const token = await user.GetAuthToken();
    res
      .status(200)
      .cookie("token", token, {
        expire: new Date(Date.now + 10800000000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: credential + " Login Successful",
        data: user,
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

exports.UpdateProfile = async (req, res, next) => {
  const { email, name, phone } = req.body;
  try {
    const id = req.params.id;
    const tempObject = {};
    if (email) {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Email already associated with another id ",
        });
      }
      tempObject.email = email;
    }
    if (name) tempObject.name = name;
    if (phone) {
      const exists = await User.findOne({ phone });
      if (exists) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "phone already associated with another id ",
        });
      }
      tempObject.phone = phone;
    }
    const user = await User.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Profile Update Successful",
      data: user,
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
exports.DeleteAndRecoverProfile = async (req, res, next) => {
  try {
    const { is_deleted } = req.body;
    console.log(" is_deleted", is_deleted);
    const id = req.params.id;
    if (typeof is_deleted !== "boolean") {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "delete action must be a boolean",
      });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { is_deleted: is_deleted },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Profile ${user.is_deleted ? "Delete" : "Recover"}  Successful`,
      data: user,
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

exports.GetProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({ success: true, status: 200, data: user });
  } catch (error) {
    res.status(500).json({ success: true, status: 500, error: error.message });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    const user_id = req.user
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }
    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, status: 200, message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ success: true, status: 500, error: error.message });
  }
};
