import { IProductCsv } from "../interfaces/products.interfaces";
import csv from "csv-parser";
import fs from "fs";

export const convertCsvToObject = (filePath: string): Promise<IProductCsv[]> => {
  return new Promise((resolve, reject) => {
    const results: IProductCsv[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: any) => {
        results.push(data);
      })
      .on("end", () => {
        fs.unlink(filePath, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      })
      .on("error", (error: any) => {
        reject(error);
      });

    return results;
  });
}
