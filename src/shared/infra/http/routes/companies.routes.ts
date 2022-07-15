import { CreateCompanyController } from "@modules/company/useCases/createCompany/CreateCompanyController";
import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateCompanyEmployeeController } from "@modules/company/useCases/createCompanyEmployee/CreateCompanyEmployeeController";
import { CreateCompanySubscriptionPlanController } from "@modules/company/useCases/createCompanySubscriptionPlan/CreateCompanySubscriptionPlanController";

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const createCompanyEmployeeController = new CreateCompanyEmployeeController();
const createCompanySubscriptionPlanController = new CreateCompanySubscriptionPlanController();

companiesRoutes.post(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    createCompanyController.handle
);

companiesRoutes.post(
    "/employees",
    ensuredAuthenticated,
    ensureAdmin,
    createCompanyEmployeeController.handle
);

companiesRoutes.post(
    "/subscriptionPlans",
    ensuredAuthenticated,
    ensureAdmin,
    createCompanySubscriptionPlanController.handle
);

export { companiesRoutes };

