const Product = require("../Model/Product");

exports.CreateProduct = async (req, res, next) => {
  try {
    const {
      seller_id,
      created_by,
      pickup_locations,
      description,
      name,
      extra_description,
      product_type,
      made_in,
      assembled_in,
      short_description,
      brand_id,
      unit_id,
      category_id,
      subcategory_id,
      min_order_quantity,
      max_order_quantity,
      attributes,
      images,
      SKU,
      freshness,
      returnable,
      cancellable,
      is_tax_included,
      tax_id,
      is_cod_allowed,
      replaceable,
      friendly_url,
      meta_title,
      meta_description,
      variation,
      guarantee_period,
      warranty_period,
    } = req.body;

    if (
      !pickup_locations ||
      !description ||
      !name ||
      !product_type ||
      !made_in ||
      !short_description ||
      !brand_id ||
      !unit_id ||
      !category_id ||
      !subcategory_id ||
      !attributes ||
      !SKU ||
      !freshness ||
      !returnable ||
      !cancellable ||
      !is_tax_included ||
      !tax_id ||
      !is_cod_allowed ||
      !replaceable ||
      !friendly_url ||
      !meta_title ||
      !variation ||
      !guarantee_period ||
      !warranty_period
    ) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user_id = req.user;
    const exists = await Product.exists({
      $and: [{ name }, { user_id }, { SKU }],
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "you have already added this product ",
      });
    }
    const newproduct = await Product.create({
      user_id: req.user,
      ...req.body,
    });
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Product added successfully",
      data: newproduct,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.GetProduct = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate([
      {
        path: "brand_id",
        model: "brand",
      },
      {
        path: "unit_id",
        model: "unit",
      },
      {
        path: "category_id",
        model: "category",
      },
      {
        path: "subcategory_id",
        model: "subcategory",
      },
      {
        path: "attributes.attribute_id",
        model: "attribute",
      },
      {
        path: "attributes.values._id",
        model: "attribute",
      },
    ]);

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.UpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      variations,
      description,
      extra_description,
      brand_id,
      unit_id,
      category_id,
      subcategory_id,
      min_order_quantity,
      max_order_quantity,
      attributes,
      SKU,
      freshness,
      type,
      dimensions,
      returnable,
      cancellable,
      replaceable,
      friendly_url,
      when_out_of_stock,
      meta_title,
      meta_description,
      guarantee,
      warranty,
      is_publish,
    } = req.body;
    const tempObject = {};
    const exists = await Product.findOne({ _id: id });
    if (name) {
      if (await Product.exists({ name })) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Name cannot be same",
        });
      }
      tempObject.name = name;
    }
    if (description) tempObject.description = description;
    if (variations) tempObject.variations = variations;
    if (extra_description) tempObject.extra_description = extra_description;
    if (brand_id) tempObject.brand_id = brand_id;
    if (unit_id) tempObject.unit_id = unit_id;
    if (category_id) tempObject.category_id = category_id;
    if (subcategory_id) tempObject.subcategory_id = subcategory_id;
    if (min_order_quantity) tempObject.min_order_quantity = min_order_quantity;
    if (max_order_quantity) tempObject.max_order_quantity = max_order_quantity;
    if (attributes) tempObject.attributes = attributes;
    if (SKU) {
      if (await Product.exists({ SKU })) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "SKU cannot be same",
        });
      }
      tempObject.SKU = SKU;
    }
    if (freshness) tempObject.freshness = freshness;
    if (type) tempObject.type = type;
    if (dimensions) tempObject.dimensions = dimensions;
    if (typeof returnable === "boolean") tempObject.returnable = returnable;
    if (typeof cancellable === "boolean") tempObject.cancellable = cancellable;
    if (typeof replaceable === "boolean") tempObject.replaceable = replaceable;
    if (friendly_url) tempObject.friendly_url = friendly_url;
    if (when_out_of_stock) tempObject.when_out_of_stock = when_out_of_stock;
    if (meta_title) tempObject.meta_title = meta_title;
    if (meta_description) tempObject.meta_description = meta_description;
    if (guarantee) tempObject.guarantee = guarantee;
    if (warranty) tempObject.warranty = warranty;
    if (typeof is_publish === "boolean") tempObject.is_publish = is_publish;

    const product = await Product.findByIdAndUpdate(id, tempObject, {
      new: true,
    });
    res.status(200).json({
      success: true,
      status: 200,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
};

exports.DeleteAndRecoverProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const exists = await Product.findById(id);
    const product = await Product.findByIdAndUpdate(
      id,
      { is_deleted: !exists.is_deleted },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "product not found",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: `Product ${
        product.is_deleted ? "Delete" : "Recover"
      }  Successful`,
      data: product,
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

exports.ActiveDeactiveVariation = async (req, res, next) => {
  const { id } = req.params;
  const { variation_id, is_publish } = req.body;
  console.log(" is_publish", is_publish);
  console.log(" variation_id", variation_id);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Product not found" });
    }
    const variation = product.variation.find(
      (variation) => variation?._id.toString() === variation_id
    );
    if (!variation) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Variation not found" });
    }
    variation.is_publish =
      typeof is_publish === "boolean" ? is_publish : variation.is_publish;
    await product.save();
    res.status(200).json({
      status: 200,
      success: true,
      message: variation.name + " is updated",
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
