import { convertCsvToObject } from "../../utils/convertCsvToObject";
import { executeQuery } from "../../database/config";
import {
  ICustomRequest,
  IPack,
  IProduct,
  IProductCsv,
  IProductWithNewPrice,
} from "../../interfaces/products.interfaces";
import { Request, Response } from "express";

export const validateCsvProductsService = async (
  req: Request,
  res: Response
): Promise<IProductWithNewPrice[]> => {
  const customReq = req as unknown as ICustomRequest;

  const results: IProductCsv[] | any = await convertCsvToObject(
    customReq.file.path
  )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error at CSV convertion:", error);
    });

  const resultsValidated: IProductWithNewPrice[] = await Promise.all(
    results.map(async (product: IProductCsv): Promise<IProductWithNewPrice> => {
      let totalValue = 0;

      let validatedDataErrors: string[] = [];

      let newProduct: IProductWithNewPrice = {
        actual_price: "",
        name: "",
        product_code: product.product_code,
        validatedDataErrors: [],
        new_price: Number(product.new_price),
      };

      if (!product.product_code) {
        validatedDataErrors.push("Esta faltando o código do produto");
      }

      if (!product.new_price) {
        validatedDataErrors.push("Esta faltando o novo preço do produto");
      }

      if (Number(product.new_price) <= 0) {
        validatedDataErrors.push(
          "Novo preço do produto é um valor igual ou menor que zero"
        );
      }

      const query = `SELECT * FROM products WHERE code = ?`;
      const params = [product.product_code];
      const productQueryResult: IProduct = await executeQuery(query, params);

      if (Array.isArray(productQueryResult) && productQueryResult.length > 0) {
        const firstProduct = productQueryResult[0];

        newProduct = {
          ...product,
          new_price: Number(product.new_price),
          actual_price: Number(firstProduct.sales_price),
          name: firstProduct.name,
          validatedDataErrors: [],
        };

        if (newProduct.new_price <= firstProduct.cost_price) {
          validatedDataErrors.push(
            "O preço de venda está abaixo do preço de custo"
          );
        }

        const tenPercent = Number(firstProduct.sales_price) / 10;

        if (
          newProduct.new_price >
          Number(firstProduct.sales_price) + tenPercent
        ) {
          const error =
            "O preço de venda está sofrendo um acrescimo maior do que 10%";
          const errorFound = validatedDataErrors.find((err) => err == error);

          if (!errorFound) {
            validatedDataErrors.push(error);
          }
        }

        if (
          newProduct.new_price <
          Number(firstProduct.sales_price) - tenPercent
        ) {
          validatedDataErrors.push(
            "O preço de venda está sofrendo um decrescimo maior do que 10%"
          );
        }
      }

      if (Array.isArray(productQueryResult) && productQueryResult.length <= 0) {
        validatedDataErrors.push("Código de produto informado não existe");
      }

      const queryProductsInPacks: string =
        "SELECT * FROM packs WHERE product_id = ?";
      const productProductsInPacksQueryResult: IPack[] = await executeQuery(
        queryProductsInPacks,
        params
      );

      if (
        Array.isArray(productProductsInPacksQueryResult) &&
        productProductsInPacksQueryResult.length > 0
      ) {
        productProductsInPacksQueryResult.map((pack) => {
          const packFound = results.some((productCSV: IProductCsv) => {
            return productCSV.product_code == pack.pack_id;
          });
          if (!packFound) {
            validatedDataErrors.push(
              "O pack do produto não está incluso no arquivo"
            );
          }
        });
      }

      const queryPacks: string = "SELECT * FROM packs WHERE pack_id = ?";
      const productPacksQueryResult: IPack[] = await executeQuery(
        queryPacks,
        params
      );

      if (
        Array.isArray(productPacksQueryResult) &&
        productPacksQueryResult.length > 0
      ) {
        productPacksQueryResult.forEach((pack) => {
          const productFound: IProductWithNewPrice = results.find(
            (productCSV: IProductWithNewPrice) =>
              productCSV.product_code == pack.product_id
          );
          if (!productFound && Number(newProduct.product_code) < 1000) {
            const error =
              "Um ou mais produtos do pacote não estão inclusos no arquivo";
            const errorFound = validatedDataErrors.find((err) => err == error);
            if (!errorFound) {
              validatedDataErrors.push(error);
            }
          }

          totalValue += Number(productFound?.new_price) * Number(pack.qty);
        });

        if (totalValue !== Number(product.new_price)) {
          const error =
            "O preço total dos produtos não é igual ao preço do pacote";
          const errorFound = validatedDataErrors.find((err) => err == error);

          if (!errorFound) {
            validatedDataErrors.push(error);
          }
        }
      }

      if (newProduct) {
        newProduct.validatedDataErrors = validatedDataErrors;
      }

      return newProduct;
    })
  );

  return resultsValidated;
};
