import { CreateProductController } from "@modules/products/useCases/createProduct/CreateProductController";
import { CreateProductContentController } from "@modules/products/useCases/createProductContent/CreateProductContentController";
import { ListProductAvailableController } from "@modules/products/useCases/listProductAvailable/ListProductAvailableController";
import { ListProductAvailableBestSellerController } from "@modules/products/useCases/listProductAvailableBestSeller/ListProductAvailableBestSellerController";
import { Router } from "express";

import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const createProductContentController = new CreateProductContentController();
const listProductAvailableController = new ListProductAvailableController();
const listProductAvailableBestSellerController =
    new ListProductAvailableBestSellerController();

productsRoutes.post("/", ensuredAuthenticated, createProductController.handle);
productsRoutes.post(
    "/productContents/:productId",
    ensuredAuthenticated,
    createProductContentController.handle
);
productsRoutes.get("/", listProductAvailableController.handle);
productsRoutes.get(
    "/bestSellers",
    listProductAvailableBestSellerController.handle
);

export { productsRoutes };
