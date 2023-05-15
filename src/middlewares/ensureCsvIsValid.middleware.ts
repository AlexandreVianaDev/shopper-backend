import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { ICustomRequest } from "../interfaces/products.interfaces";

export const ensureCsvIsValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req as unknown as ICustomRequest;

  if (!req.file) {
    throw new AppError("Missing file", 400);
  }

  if (req.file.mimetype !== "text/csv") {
    throw new AppError("Wrong type of file, please upload a csv", 400);
  }

  next();
};
