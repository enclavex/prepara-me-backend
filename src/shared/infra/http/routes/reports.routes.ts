import { Router } from "express";
import { NPSSurveyAnswersController } from "../../../../reports/NPSSurveyAnswers/useCase/NPSSurveyAnswersController";

const reportsRoutes = Router();

const npsSurveyAnswersController = new NPSSurveyAnswersController();
reportsRoutes.get("/npsSurveyAnswers", npsSurveyAnswersController.handle);

export { reportsRoutes };