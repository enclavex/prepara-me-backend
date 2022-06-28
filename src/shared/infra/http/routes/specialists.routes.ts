import { CreateProductSpecialistController } from "@modules/specialists/useCases/createProductSpecialist/CreateProductSpecialistController";
import { CreateSpecialistController } from "@modules/specialists/useCases/createSpecialist/CreateSpecialistController";
import { CreateSpecialistScheduleAvailableController } from "@modules/specialists/useCases/createSpecialistScheduleAvailable/CreateSpecialistScheduleAvailableController";
import { UpdateSpecialistScheduleAvailableController } from "@modules/specialists/useCases/updateSpecialistScheduleAvailable/UpdateSpecialistScheduleAvailableController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const specialistsRoutes = Router();

const createSpecialistController = new CreateSpecialistController()
const createProductSpecialistController = new CreateProductSpecialistController()
const createSpecialistScheduleAvailableController = new CreateSpecialistScheduleAvailableController()
const updateSpecialistScheduleAvailableController = new UpdateSpecialistScheduleAvailableController()

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