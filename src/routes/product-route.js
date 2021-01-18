const express = require("express");

const ProductController = require("../controllers/product-controller");

const router = express.Router();

router.post("/product", (req, res) => {
  ProductController.createProduct(req, res);
});
router.post("/productBulk", (req, res) => {
  ProductController.createProductBulk(req, res);
});
router.put("/updateProduct/:id", (req, res) => {
  ProductController.updateProduct(req, res);
});
router.delete("/deleteProduct/:id", (req, res) => {
  ProductController.deleteProduct(req, res);
});
router.get("/product/:id", (req, res) => {
  ProductController.getProductById(req, res);
});
router.get("/products", (req, res) => {
  ProductController.getProducts(req, res);
});

module.exports = router;
