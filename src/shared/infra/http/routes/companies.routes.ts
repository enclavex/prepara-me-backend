import { CreateCompanyController } from "@modules/company/useCases/createCompany/CreateCompanyController";
import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateCompanyEmployeeController } from "@modules/company/useCases/createCompanyEmployee/CreateCompanyEmployeeController";
import { CreateCompanySubscriptionPlanController } from "@modules/company/useCases/createCompanySubscriptionPlan/CreateCompanySubscriptionPlanController";
import { ListCompanyController } from "@modules/company/useCases/listCompany/ListCompanyController";
import { GetCompanyByIdController } from "@modules/company/useCases/getCompanyById/GetCompanyByIdController";
import { RemoveCompanyController } from "@modules/company/useCases/removeCompany/RemoveCompanyController";

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompanyController = new ListCompanyController();
const removeCompanyControllerController = new RemoveCompanyController();
const createCompanyEmployeeController = new CreateCompanyEmployeeController();
const createCompanySubscriptionPlanController = new CreateCompanySubscriptionPlanController();

companiesRoutes.post(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    createCompanyController.handle
);

companiesRoutes.get(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    listCompanyController.handle
);

companiesRoutes.get(
    "/:id",
    ensuredAuthenticated,
    ensureAdmin,
    listCompanyController.handle
);

companiesRoutes.delete(
    "/:id",
    ensuredAuthenticated,
    ensureAdmin,
    removeCompanyControllerController.handle
);

companiesRoutes.post(
    "/employees",
    ensuredAuthenticated,
    ensureAdmin,
    createCompanyEmployeeController.handle
);

companiesRoutes.post(
    "/:id/subscriptionPlans",
    ensuredAuthenticated,
    ensureAdmin,
    createCompanySubscriptionPlanController.handle
);

export { companiesRoutes };

