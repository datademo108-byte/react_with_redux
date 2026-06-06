import product from "../models/Product.js"

// GET ALL PRODUCTS

export const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// CREATE PRODUCT

export const createProduct = async (req, res) => {

  try {

    const {
      name,
      price,
      image,
      description,
    } = req.body;

    const product = await Product.create({

      name,

      price,

      image,

      description,

    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// UPDATE PRODUCT

export const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    product.name =
      req.body.name || product.name;

    product.price =
      req.body.price || product.price;

    product.image =
      req.body.image || product.image;

    product.description =
      req.body.description ||
      product.description;

    const updatedProduct =
      await product.save();

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// DELETE PRODUCT

export const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};