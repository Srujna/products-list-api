const Product = require("../models/product-model");

createProduct = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Invalid or Empty data",
    });
  }

  const product = new Product(body);

  if (!product) {
    return res.status(400).json({ success: false, error: err });
  }

  product
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: product._id,
        message: "Product uploaded!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        success: false,
        message: "Product not uploaded!",
      });
    });
};

createProductBulk = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Invalid or Empty data",
    });
  }

  Product.insertMany(body)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: "Products uploaded!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        success: false,
        message: "Products not uploaded!",
      });
    });
};

updateProduct = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Invalid or Empty data",
    });
  }

  Product.findOne({ _id: req.params.id })
    .then((product) => {
      product.productName = body.productName;
      product.productSKU = body.productSKU;
      product.productCategory = body.productCategory;
      product.region = body.region;
      product.rating = body.rating;
      product.price = body.price;
      product
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: product._id,
            message: "Product has been updated!",
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            success: false,
            message: "Product not updated!",
          });
        });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        success: false,
        message: "Product not found!",
      });
    });
};

deleteProduct = async (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id })
    .then((product) => {
      return res.status(201).json({
        success: true,
        message: "Product deleted!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        success: false,
        message: "Product not found!",
      });
    });
};

getProductById = async (req, res) => {
  await Product.findOne({ _id: req.params.id }, (error, product) => {
    if (error) {
      return res.status(400).json({ success: false, error });
    }

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: `Product not found` });
    }
    return res.status(200).json({ success: true, data: product });
  }).catch((err) => console.log(err));
};

getProducts = async (req, res) => {
  await Product.find({}, (error, products) => {
    if (error) {
      return res.status(400).json({ success: false, error });
    }
    return res.status(200).json({ success: true, data: products });
  }).catch((err) => console.log(err));
};

module.exports = {
  createProduct,
  createProductBulk,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
