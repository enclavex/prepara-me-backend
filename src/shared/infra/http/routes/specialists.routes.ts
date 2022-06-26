import { CreateSpecialistController } from "@modules/specialists/useCases/createEspecialist/CreateSpecialistController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const specialistsRoutes = Router();

const createSpecialistController = new CreateSpecialistController()

specialistsRoutes.post("/",
    ensuredAuthenticated,
    ensureAdmin,
    createSpecialistController.handle)

export { specialistsRoutes }