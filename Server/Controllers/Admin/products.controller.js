import { ImageUploadUtil } from "../../Helpers/cloudinary.js";
import Product from "../../Models/Product.model.js";

//Handle Image Upload
export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occurred",
      error,
    });
  }
};

//Add a product
export const addProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;

  try {
    const newProduct = await Product.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    res.status(201).json({
      success: true,
      message: "Product Added succesfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error occurred",
    });
  }
};

//Fetch Products
export const fetchProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error occurred",
    });
  }
};

//Edit Products
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const cleanBody = {};
    for (const key in req.body) {
      if (req.body[key] != "") {
        cleanBody[key] = req.body[key];
      }
    }

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // new: true only the properties that have changed are changed rest are untouched
    const updatedProduct = await Product.findByIdAndUpdate(id, cleanBody, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Updated Data",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error occurred",
    });
  }
};

//Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.json({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error occurred",
    });
  }
};
