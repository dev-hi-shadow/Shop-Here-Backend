const Product = require("../Model/Product");

exports.CreateProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      extra_description,
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
      type,
      dimensions,
      returnable,
      cancellable,
      replaceable,
      friendly_url,
      when_out_of_stock,
      meta_title,
      meta_description,
      price,
      guarantee,
      warranty,
    } = req.body;

    const user_id = req.user;
    const exists = await Product.exists({
      $and: [{ name }, { user_id }],
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "you have already added this product ",
      });
    }
    const product = await Product.create({
      user_id: req.user,
      name,
      description,
      extra_description,
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
      type,
      dimensions,
      returnable,
      cancellable,
      replaceable,
      friendly_url,
      when_out_of_stock,
      meta_title,
      meta_description,
      price,
      guarantee,
      warranty,
    });
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Product added successfully",
      data: product,
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
        model: "brand", // Assuming "brand" is the model name
      },
      {
        path: "unit_id",
        model: "unit", // Assuming "unit" is the model name
      },
      {
        path: "category_id",
        model: "category", // Assuming "category" is the model name
      },
      {
        path: "subcategory_id",
        model: "subcategory", // Assuming "subcategory" is the model name
      },
      {
        path: "attributes.attribute_id",
        model: "attribute", // Assuming "attributes" is the model name
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
      description,
      extra_description,
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
      type,
      dimensions,
      returnable,
      cancellable,
      replaceable,
      friendly_url,
      when_out_of_stock,
      meta_title,
      meta_description,
      price,
      guarantee,
      warranty,
      is_publish,
    } = req.body;

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
    if (extra_description) tempObject.extra_description = extra_description;
    if (brand_id) tempObject.brand_id = brand_id;
    if (unit_id) tempObject.unit_id = unit_id;
    if (category_id) tempObject.category_id = category_id;
    if (subcategory_id) tempObject.subcategory_id = subcategory_id;
    if (min_order_quantity) tempObject.min_order_quantity = min_order_quantity;
    if (max_order_quantity) tempObject.max_order_quantity = max_order_quantity;
    if (attributes) tempObject.attributes = attributes;
    if (images) tempObject.images = images;
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
    if (price) tempObject.price = price;
    if (guarantee) tempObject.guarantee = guarantee;
    if (warranty) tempObject.warranty = warranty;

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
