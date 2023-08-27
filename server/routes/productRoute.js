const express = require("express");
const router = express.Router();
const {uploadProduct, getProduct} = require("./../controllers/productController")


router.post("/uploadProduct",uploadProduct)
router.get("/getProduct",getProduct)


exports.router = router;