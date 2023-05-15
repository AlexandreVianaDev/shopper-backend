import { Router } from "express";
import {
  updateProductsController,
  validateCsvProductsController,
} from "../controllers/products.controllers";
import { upload } from "../middlewares/uploadFile.middleware";
import { ensureCsvIsValidMiddleware } from "../middlewares/ensureCsvIsValid.middleware";

export const productsRoutes: Router = Router();

productsRoutes.post(
  "/validate",
  upload.single("inputUpload"),
  ensureCsvIsValidMiddleware,
  validateCsvProductsController
);

productsRoutes.patch(
  "",
  upload.single("inputUpload"),
  ensureCsvIsValidMiddleware,
  updateProductsController
);
