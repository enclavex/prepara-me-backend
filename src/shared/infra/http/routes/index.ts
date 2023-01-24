import { Router } from "express";

import { authenticateRoutes } from "./autheticate.routes";
import { specialistsRoutes } from "./specialists.routes";
import { passwordRoutes } from "./password.routes";
import { productsRoutes } from "./products.routes";
import { companiesRoutes } from "./companies.routes";
import { subscriptionPlansRoutes } from "./subscriptionPlans.routes";
import { usersRoutes } from "./users.routes";
import { reportsRoutes } from "./reports.routes";
import { ordersRoutes } from "./orders.routes";
import { resumesRoutes } from "./resumes.routes";

const router = Router();

router.use("/specialists", specialistsRoutes);
router.use("/products", productsRoutes);
router.use("/companies", companiesRoutes);
router.use("/subscriptionPlans", subscriptionPlansRoutes);
router.use("/password", passwordRoutes);
router.use("/users", usersRoutes);
router.use("/reports", reportsRoutes);
router.use("/orders", ordersRoutes);
router.use("/resumes", resumesRoutes);
router.use(authenticateRoutes);

export { router };

