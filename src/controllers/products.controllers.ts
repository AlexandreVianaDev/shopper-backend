import { Request, Response } from "express";
import { updateProductsService } from "../services/products/updateProducts.services";
import { validateCsvProductsService } from "../services/products/validateCsvProducts.services";
import {
  IProduct,
  IProductWithNewPrice,
} from "../interfaces/products.interfaces";

export const validateCsvProductsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const products: IProductWithNewPrice[] | void =
    await validateCsvProductsService(req, res);
  const hasErrors: boolean = products.some(
    (product) => product.validatedDataErrors?.length > 0
  );

  if (hasErrors) {
    return res.status(409).json(products);
  }
  return res.status(200).json(products);
};

export const updateProductsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedProducts: IProduct[] = await updateProductsService(req);
  return res.status(200).json(updatedProducts);
};
