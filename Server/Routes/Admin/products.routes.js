import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
  handleImageUpload,
} from "../../Controllers/Admin/products.controller.js";
import { upload } from "../../Helpers/cloudinary.js";

const productRouter = Router();

productRouter.post(
  "/upload-image",
  upload.single("my_file"),
  handleImageUpload
);
productRouter.get("/fetch", fetchProducts);
productRouter.post("/add", addProduct);
productRouter.put("/edit/:id", editProduct);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
