import { CreateProductSpecialistController } from "@modules/specialists/useCases/createProductSpecialist/CreateProductSpecialistController";
import { CreateSpecialistController } from "@modules/specialists/useCases/createSpecialist/CreateSpecialistController";
import { CreateSpecialistScheduleAvailableController } from "@modules/specialists/useCases/createSpecialistScheduleAvailable/CreateSpecialistScheduleAvailableController";
import { ListScheduleSpecialistByDateController } from "@modules/specialists/useCases/listScheduleSpecialistByDate/ListScheduleSpecialistByDateController";
import { ListSpecialistController } from "@modules/specialists/useCases/listSpecialist/ListSpecialistController";
import { RemoveSpecialistController } from "@modules/specialists/useCases/removeSpecialist/RemoveSpecialistController";
import { ListSpecialistsByProductController } from "@modules/specialists/useCases/listSpecialistsByProduct/ListSpecialistsByProductController";
import { UpdateSpecialistScheduleAvailableController } from "@modules/specialists/useCases/updateSpecialistScheduleAvailable/UpdateSpecialistScheduleAvailableController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { RemoveProductSpecialistController } from "@modules/specialists/useCases/removeProductSpecialist/RemoveProductSpecialistController";

const specialistsRoutes = Router();

const createSpecialistController = new CreateSpecialistController();
const createProductSpecialistController =
    new CreateProductSpecialistController();
const createSpecialistScheduleAvailableController =
    new CreateSpecialistScheduleAvailableController();
const updateSpecialistScheduleAvailableController =
    new UpdateSpecialistScheduleAvailableController();
const listSpecialistController = new ListSpecialistController();
const removeSpecialistController = new RemoveSpecialistController();
const listSpecialistByProductController =
    new ListSpecialistsByProductController();
const listScheduleSpecialistByDateController =
    new ListScheduleSpecialistByDateController();
const removeProductSpecialistController = new RemoveProductSpecialistController();

specialistsRoutes.get("/", listSpecialistController.handle);

specialistsRoutes.get("/:id", listSpecialistController.handle);

specialistsRoutes.delete(
    "/:id",
    ensuredAuthenticated,
    ensureAdmin,
    removeSpecialistController.handle
);

specialistsRoutes.get(
    "/products/:productId",
    listSpecialistByProductController.handle
);

specialistsRoutes.get(
    "/scheduleSpecialistAvailable/:specialistId",
    listScheduleSpecialistByDateController.handle
);

specialistsRoutes.post(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    createSpecialistController.handle
);

specialistsRoutes.post(
    "/:id/products",
    ensuredAuthenticated,
    ensureAdmin,
    createProductSpecialistController.handle
);

specialistsRoutes.delete(
    "/products/:id",
    ensuredAuthenticated,
    ensureAdmin,
    removeProductSpecialistController.handle
);

specialistsRoutes.post(
    "/dateSchedule/:specialistId",
    ensuredAuthenticated,
    ensureAdmin,
    createSpecialistScheduleAvailableController.handle
);

specialistsRoutes.put(
    "/dateSchedule/:specialistScheduleAvailableId",
    ensuredAuthenticated,
    updateSpecialistScheduleAvailableController.handle
);

export { specialistsRoutes };
