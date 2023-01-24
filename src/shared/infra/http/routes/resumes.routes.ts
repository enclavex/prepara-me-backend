import { CreateResumeController } from "@modules/resume/useCases/createResume/CreateResumeController";
import { ListResumeController } from "@modules/resume/useCases/listResume/ListResumeController";
import { RemoveResumeController } from "@modules/resume/useCases/removeResume/RemoveResumeController";
import { Router } from "express";

const resumesRoutes = Router();

const listResumeController = new ListResumeController();
resumesRoutes.get("/:id", listResumeController.handle);
resumesRoutes.get("/", listResumeController.handle);

const removeResumeController = new RemoveResumeController();
resumesRoutes.delete("/:id", removeResumeController.handle);

const createResumeController = new CreateResumeController();
resumesRoutes.post("/", createResumeController.handle);

export { resumesRoutes };
