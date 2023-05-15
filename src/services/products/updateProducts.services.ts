import { convertCsvToObject } from "../../utils/convertCsvToObject";
import { executeQuery } from "../../database/config";
import {
  ICustomRequest,
  IProduct,
  IProductCsv,
} from "../../interfaces/products.interfaces";
import { Request } from "express";

export const updateProductsService = async (
  req: Request
): Promise<IProduct[]> => {
  const customReq = req as unknown as ICustomRequest;
  const results: any = await convertCsvToObject(customReq.file.path)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error at CSV convertion:", error);
    });

  let products: Promise<IProduct[]> = results.map(
    async (product: IProductCsv) => {
      const query = `
        UPDATE
          products
        SET 
          sales_price = ?
        WHERE
          code = ?`;
      const params = [product.new_price || null, product.product_code || null];
      const productQueryResult: IProduct[] = await executeQuery(query, params);
      return productQueryResult;
    }
  );

  return products;
};
