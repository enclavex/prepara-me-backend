import { CreateProductSpecialistController } from "@modules/specialists/useCases/createProductSpecialist/CreateProductSpecialistController";
import { CreateSpecialistController } from "@modules/specialists/useCases/createSpecialist/CreateSpecialistController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const specialistsRoutes = Router();

const createSpecialistController = new CreateSpecialistController()
const createProductSpecialistController = new CreateProductSpecialistController()

specialistsRoutes.post("/",
    ensuredAuthenticated,
    ensureAdmin,
    createSpecialistController.handle)

specialistsRoutes.post("/product/:specialistId",
    ensuredAuthenticated,
    ensureAdmin,
    createProductSpecialistController.handle)

export { specialistsRoutes }