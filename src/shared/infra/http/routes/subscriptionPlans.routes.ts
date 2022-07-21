import { CreateSubscriptionPlanController } from "@modules/products/useCases/createSubscriptionPlan/CreateSubscriptionPlanController";
import { ListSubscriptionPlanController } from "@modules/products/useCases/listSubscriptionPlan/ListSubscriptionPlanController";
import { CreateSubscriptionPlanProductController } from "@modules/products/useCases/createSubscriptionPlanProduct/CreateSubscriptionPlanProductController";
import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { RemoveSubscriptionPlanController } from "@modules/products/useCases/removeSubscriptionPlan/RemoveSubscriptionPlanController";
import { GetSubscriptionPlanByIdController } from "@modules/products/useCases/getSubscriptionPlanById/GetSubscriptionPlanByIdController";

const subscriptionPlansRoutes = Router();

const createSubscriptionPlanController = new CreateSubscriptionPlanController();
const createSubscriptionPlanProductController = new CreateSubscriptionPlanProductController();
const listSubscriptionPlanController = new ListSubscriptionPlanController();
const getSubscriptionPlanByIdController = new GetSubscriptionPlanByIdController();
const removeSubscriptionPlanController = new RemoveSubscriptionPlanController();

subscriptionPlansRoutes.post(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    createSubscriptionPlanController.handle
);

subscriptionPlansRoutes.get(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    listSubscriptionPlanController.handle
);

subscriptionPlansRoutes.get(
    "/:id",
    ensuredAuthenticated,
    ensureAdmin,
    getSubscriptionPlanByIdController.handle
);

subscriptionPlansRoutes.delete(
    "/:id",
    ensuredAuthenticated,
    ensureAdmin,
    removeSubscriptionPlanController.handle
);

subscriptionPlansRoutes.post(
    "/products",
    ensuredAuthenticated,
    ensureAdmin,
    createSubscriptionPlanProductController.handle
);

export { subscriptionPlansRoutes };
