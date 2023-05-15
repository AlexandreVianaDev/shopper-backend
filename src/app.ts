import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { productsRoutes } from "./routers/products.routes";
import { errorHandlerMiddleware } from "./middlewares/errorHandle.middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", productsRoutes);

app.use(errorHandlerMiddleware);

export default app;
