import express from "express";

import {

  getProducts,

  createProduct,

  updateProduct,

  deleteProduct,
  getProductById,

} from "../controllers/productController.js";

const router = express.Router();


// GET PRODUCTS

router.get("/", getProducts);


// CREATE PRODUCT

router.post("/", createProduct);


// UPDATE PRODUCT

router.put("/:id", updateProduct);


// DELETE PRODUCT

router.delete("/:id", deleteProduct);

router.get("/:id", getProductById);

export default router;