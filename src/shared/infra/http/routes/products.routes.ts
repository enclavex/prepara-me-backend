import { CreateProductController } from "@modules/products/useCases/createProduct/CreateProductController";
import { CreateProductContentController } from "@modules/products/useCases/createProductContent/CreateProductContentController";
import { GetProductByIdController } from "@modules/products/useCases/getProductById/GetProductByIdController";
import { ListProductController } from "@modules/products/useCases/listProduct/ListProductController";
import { ListProductAvailableController } from "@modules/products/useCases/listProductAvailable/ListProductAvailableController";
import { ListProductAvailableBestSellerController } from "@modules/products/useCases/listProductAvailableBestSeller/ListProductAvailableBestSellerController";
import { RemoveProductController } from "@modules/products/useCases/removeProduct/RemoveProductController";
import { Router } from "express";

import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const createProductContentController = new CreateProductContentController();
const listProductController = new ListProductController();
const removeProductController = new RemoveProductController();
const listProductAvailableBestSellerController =
    new ListProductAvailableBestSellerController();

productsRoutes.get("/", listProductController.handle);
productsRoutes.get("/:id", listProductController.handle);
productsRoutes.delete("/:id", removeProductController.handle);
productsRoutes.post("/", ensuredAuthenticated, createProductController.handle);

productsRoutes.post(
    "/productContents/:productId",
    ensuredAuthenticated,
    createProductContentController.handle
);
productsRoutes.get(
    "/bestSellers",
    listProductAvailableBestSellerController.handle
);

export { productsRoutes };

