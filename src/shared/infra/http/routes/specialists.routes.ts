import { CreateProductSpecialistController } from "@modules/specialists/useCases/createProductSpecialist/CreateProductSpecialistController";
import { CreateSpecialistController } from "@modules/specialists/useCases/createSpecialist/CreateSpecialistController";
import { CreateSpecialistScheduleAvailableController } from "@modules/specialists/useCases/createSpecialistScheduleAvailable/CreateSpecialistScheduleAvailableController";
import { ListScheduleSpecialistByDateController } from "@modules/specialists/useCases/listScheduleSpecialistByDate/ListScheduleSpecialistByDateController";
import { ListSpecialistAvailableController } from "@modules/specialists/useCases/listSpecialistAvailable/ListSpecialistAvailableController";
import { ListSpecialistsByProductController } from "@modules/specialists/useCases/listSpecialistsByProduct/ListSpecialistsByProductController";
import { UpdateSpecialistScheduleAvailableController } from "@modules/specialists/useCases/updateSpecialistScheduleAvailable/UpdateSpecialistScheduleAvailableController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const specialistsRoutes = Router();

const createSpecialistController = new CreateSpecialistController()
const createProductSpecialistController = new CreateProductSpecialistController()
const createSpecialistScheduleAvailableController = new CreateSpecialistScheduleAvailableController()
const updateSpecialistScheduleAvailableController = new UpdateSpecialistScheduleAvailableController()
const listSpecialistAvailableController = new ListSpecialistAvailableController()
const listSpecialistByProductController = new ListSpecialistsByProductController()
const listScheduleSpecialistByDateController = new ListScheduleSpecialistByDateController()

specialistsRoutes.get("/",
listSpecialistAvailableController.handle)

specialistsRoutes.get("/:productId",
listSpecialistByProductController.handle)

specialistsRoutes.get("/scheduleSpecialistAvailable/:specialistId",
listScheduleSpecialistByDateController.handle)

specialistsRoutes.post("/",
    ensuredAuthenticated,
    ensureAdmin,
    createSpecialistController.handle)

specialistsRoutes.post("/product/:specialistId",
    ensuredAuthenticated,
    ensureAdmin,
    createProductSpecialistController.handle)

specialistsRoutes.post("/dateSchedule/:specialistId",
    ensuredAuthenticated,
    ensureAdmin,
    createSpecialistScheduleAvailableController.handle)

specialistsRoutes.put("/dateSchedule/:specialistScheduleAvailableId",
    ensuredAuthenticated,
    updateSpecialistScheduleAvailableController.handle)

export { specialistsRoutes }