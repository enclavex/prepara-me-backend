import { CreateProductSpecialistController } from "@modules/specialists/useCases/createProductSpecialist/CreateProductSpecialistController";
import { CreateSpecialistController } from "@modules/specialists/useCases/createSpecialist/CreateSpecialistController";
import { ListSpecialistController } from "@modules/specialists/useCases/listSpecialist/ListSpecialistController";
import { RemoveSpecialistController } from "@modules/specialists/useCases/removeSpecialist/RemoveSpecialistController";
import { ListSpecialistsByProductController } from "@modules/specialists/useCases/listSpecialistsByProduct/ListSpecialistsByProductController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { RemoveProductSpecialistController } from "@modules/specialists/useCases/removeProductSpecialist/RemoveProductSpecialistController";
import { CreateSpecialistScheduleController } from "@modules/specialists/useCases/createSpecialistScheduleAvailable/CreateSpecialistScheduleController";
import { UpdateSpecialistScheduleController } from "@modules/specialists/useCases/updateSpecialistSchedule/UpdateSpecialistScheduleController";
import { ListSpecialistScheduleController } from "@modules/specialists/useCases/listSpecialistSchedule/ListSpecialistScheduleController";
import { RemoveSpecialistScheduleController } from "@modules/specialists/useCases/removeSpecialistSchedule/RemoveSpecialistScheduleController";

const specialistsRoutes = Router();

const createSpecialistScheduleController =
    new CreateSpecialistScheduleController();
specialistsRoutes.post(
    "/:specialistId/schedule",
    ensuredAuthenticated,
    createSpecialistScheduleController.handle
);

const listSpecialistScheduleController = new ListSpecialistScheduleController();
specialistsRoutes.get("/schedule/", listSpecialistScheduleController.handle);
specialistsRoutes.get("/schedule/:id", listSpecialistScheduleController.handle);

const removeSpecialistScheduleController =
    new RemoveSpecialistScheduleController();
specialistsRoutes.delete(
    "/schedule/:id",
    ensuredAuthenticated,
    removeSpecialistScheduleController.handle
);

const updateSpecialistScheduleController =
    new UpdateSpecialistScheduleController();
specialistsRoutes.put(
    "/dateSchedule/:specialistScheduleId",
    ensuredAuthenticated,
    updateSpecialistScheduleController.handle
);

const createProductSpecialistController =
    new CreateProductSpecialistController();
specialistsRoutes.post(
    "/:id/products",
    ensuredAuthenticated,
    ensureAdmin,
    createProductSpecialistController.handle
);

const listSpecialistByProductController =
    new ListSpecialistsByProductController();
specialistsRoutes.get(
    "/products/:productId",
    listSpecialistByProductController.handle
);

const removeProductSpecialistController =
    new RemoveProductSpecialistController();
specialistsRoutes.delete(
    "/products/:id",
    ensuredAuthenticated,
    ensureAdmin,
    removeProductSpecialistController.handle
);

const createSpecialistController = new CreateSpecialistController();
specialistsRoutes.post(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    createSpecialistController.handle
);

const listSpecialistController = new ListSpecialistController();
specialistsRoutes.get("/", listSpecialistController.handle);
specialistsRoutes.get("/:id", listSpecialistController.handle);

const removeSpecialistController = new RemoveSpecialistController();
specialistsRoutes.delete(
    "/:id",
    ensuredAuthenticated,
    ensureAdmin,
    removeSpecialistController.handle
);



export { specialistsRoutes };

