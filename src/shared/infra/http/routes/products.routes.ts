import { CreateProductController } from "@modules/products/useCases/createProduct/CreateProductController";
import { CreateProductContentController } from "@modules/products/useCases/createProductContent/CreateProductContentController";
import { RemoveProductContentController } from "@modules/products/useCases/removeProductContent/RemoveProductContentController";
import { ListProductController } from "@modules/products/useCases/listProduct/ListProductController";
import { RemoveProductController } from "@modules/products/useCases/removeProduct/RemoveProductController";
import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateRequestScheduleController } from "@modules/products/useCases/createRequestSchedule/CreateRequestScheduleController";

const productsRoutes = Router();

const listProductController = new ListProductController();
productsRoutes.get("/", listProductController.handle);
productsRoutes.get("/:id", listProductController.handle);

const removeProductController = new RemoveProductController();
productsRoutes.delete(
    "/:id",
    ensuredAuthenticated,
    ensureAdmin,
    removeProductController.handle
);

const createProductController = new CreateProductController();
productsRoutes.post(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    createProductController.handle
);

const createRequestScheduleController = new CreateRequestScheduleController();
productsRoutes.post(
    "/requestSchedule",
    createRequestScheduleController.handle
);

const listRequestScheduleController = new ListProductController();
productsRoutes.get(
    "/requestSchedule/:id",
    ensuredAuthenticated,
    ensureAdmin,
    listRequestScheduleController.handle
);

const createProductContentController = new CreateProductContentController();
productsRoutes.post(
    "/:productId/productContents",
    ensuredAuthenticated,
    ensureAdmin,
    createProductContentController.handle
);

const removeProductContentController = new RemoveProductContentController();
productsRoutes.delete(
    "/productContents/:id",
    ensuredAuthenticated,
    ensureAdmin,
    removeProductContentController.handle
);

export { productsRoutes };

