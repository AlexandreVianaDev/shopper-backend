export interface IUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export interface ICustomRequest extends Request {
  file: IUploadedFile;
}

export interface ICustomRequestMulter extends Request {
  file: Express.Multer.File;
}

export interface IProduct {
  actual_price: string | number;
  name: string;
  product_code: string | number;
  validatedDataErrors: string[];
}

export interface IProductWithNewPrice extends IProduct {
  new_price: number;
}

export interface IProductCsv {
  product_code: string | number;
  new_price: string | number;
}

export interface IPack {
  id: number;
  pack_id: number | string;
  product_id: number;
  qty: number;
}
