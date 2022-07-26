import { CreateProductController } from "@modules/products/useCases/createProduct/CreateProductController";
import { CreateProductContentController } from "@modules/products/useCases/createProductContent/CreateProductContentController";
import { RemoveProductContentController } from "@modules/products/useCases/removeProductContent/RemoveProductContentController";
import { ListProductController } from "@modules/products/useCases/listProduct/ListProductController";
import { RemoveProductController } from "@modules/products/useCases/removeProduct/RemoveProductController";
import { Router } from "express";

import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const createProductContentController = new CreateProductContentController();
const removeProductContentController = new RemoveProductContentController();
const listProductController = new ListProductController();
const removeProductController = new RemoveProductController();

productsRoutes.get("/", listProductController.handle);
productsRoutes.get("/:id", listProductController.handle);
productsRoutes.delete("/:id", removeProductController.handle);
productsRoutes.post("/", ensuredAuthenticated, createProductController.handle);

productsRoutes.post(
    "/:productId/productContents",
    ensuredAuthenticated,
    createProductContentController.handle
);

productsRoutes.delete(
    "/productContents/:id",
    ensuredAuthenticated,
    removeProductContentController.handle
);

export { productsRoutes };

