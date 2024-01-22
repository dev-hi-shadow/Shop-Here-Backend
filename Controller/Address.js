const Address = require("../Model/Address");

exports.AddressCreate = async (req, res, next) => {
  try {
    const {
      name,
      primary_phone_no,
      second_phone_no,
      profession,
      flat_block_no,
      building,
      society,
      landmark,
      city,
      state,
      country,
      is_pickup_address,
    } = req.body;

    if (
      !name ||
      !primary_phone_no ||
      !flat_block_no ||
      !society ||
      !city ||
      !state
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Please fill all the fields",
      });
    }
    const address = await Address.create({
      user_id: req.user,
      name,
      second_phone_no,
      flat_block_no,
      primary_phone_no,
      profession,
      society,
      building,
      city,
      landmark,
      country,
      state,
      is_pickup_address
    });
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Address create successful",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ success: true, status: 500, error: error.message });
  }
};

exports.GetAddress = async (req, res, next) => {
  try {
    const address = await Address.find({ user_id: req.user });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Address get successful",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ success: true, status: 500, error: error.message });
  }
};

exports.UpdateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      age,
      phone,
      second_phone,
      profession,
      flat_block_no,
      building,
      society,
      landmark,
      city,
      state,
      country,
      is_deleted,
    } = req.body;
    const tempObject = {};
    if (name) tempObject.name = name;
    if (age) tempObject.age = age;
    if (phone) tempObject.phone = phone;
    if (second_phone) tempObject.second_phone = second_phone;
    if (tempObject.phone === tempObject.second_phone) {
      return res.status(400).json({
        success: false,
        status: 401,
        error: "phone and second phone should be unique",
      });
    }
    if (profession) tempObject.profession = profession;
    if (flat_block_no) tempObject.flat_block_no = flat_block_no;
    if (building) tempObject.building = building;
    if (society) tempObject.society = society;
    if (landmark) tempObject.landmark = landmark;
    if (city) tempObject.city = city;
    if (state) tempObject.state = state;
    if (country) tempObject.country = country;
    if (typeof is_deleted === "boolean") {
      tempObject.is_deleted = is_deleted;
    }
    const address = await Address.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    res.status(200).json({
      success: true,
      status: 200,
      message: "address updated successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ success: true, status: 500, error: error.message });
  }
};

exports.DeleteAndRecoverAddress = async (req, res, next) => {
  try {
    const id = req.params.id;
    const address = await Address.findByIdAndUpdate(
      id,
      { is_deleted: req.body.is_deleted },
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "address not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Address ${
        address.is_deleted ? "Delete" : "Recover"
      }  Successful`,
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
