const Coupon = require("../Model/Coupon");

exports.CouponCreate = async (req, res, next) => {
  try {
    const {
      name,
      code,
      start_date,
      end_date,
      discount,
      discount_type,
      min_order_amount,
      max_discount,
      is_repeatable,
      is_active,
    } = req.body;
    if (
      !name ||
      !code ||
      !start_date ||
      !end_date ||
      !discount ||
      !discount_type ||
      !min_order_amount ||
      !max_discount
    ) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "please fill all the fields",
      });
    }
    const exists = await Brand.exists({ code, name });
    if (exists) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Coupon already exists",
      });
    }
    const coupon = await Coupon.create({
      name,
      code,
      start_date,
      end_date,
      discount,
      discount_type,
      min_order_amount,
      max_discount,
      is_repeatable,
      is_active,
    });
    res.status(201).json({
      success: true,
      status: 200,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

exports.GetCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.find().lean();
    res.status(200).json({
      success: true,
      status: 200,
      message: "Coupon fetched successfully",
      data: coupon,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, status: 500, error: error.message });
  }
};

exports.UpdateCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      start_date,
      end_date,
      discount,
      discount_type,
      min_order_amount,
      max_discount,
      is_repeatable,
      is_active,
    } = req.body;
    const tempObject = {};
    if (start_date) tempObject.start_date = start_date;
    if (end_date) tempObject.end_date = end_date;
    if (discount) tempObject.discount = discount;
    if (discount_type) tempObject.discount_type = discount_type;
    if (min_order_amount) tempObject.min_order_amount = min_order_amount;
    if (max_discount) tempObject.max_discount = max_discount;
    if (typeof is_repeatable === "boolean")
      tempObject.is_repeatable = is_repeatable;
    if (typeof is_active === "boolean") tempObject.is_active = is_active;

    if (name || code) {
      const exists = await Coupon.exists({
        name: tempObject.name,
        code: tempObject.code,
      });
      if (exists) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Coupon already exists",
        });
      }
      tempObject.name = name;
      tempObject.code = code;
    }
    const coupon = await Coupon.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    res.status(200).json({
      success: true,
      status: 200,
      message: "Coupon updated successfully",
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

    const exists = await Coupon.findById(id);
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { is_deleted: !exists.is_deleted },
      { new: true }
    );
    if (!coupon) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "coupon not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `coupon ${coupon.is_deleted ? "Delete" : "Recover"}  Successful`,
      data: coupon,
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
