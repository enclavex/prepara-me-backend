import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { CreateUserProductAvailableController } from "@modules/accounts/useCases/createUserProductAvailable/CreateUserProductAvailableController";
import { ListUserController } from "@modules/accounts/useCases/listUser/ListUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import uploadConfig from "@config/upload";
import multer from "multer";
import { ListUserProductsAvailableController } from "@modules/accounts/useCases/listUserProductsAvailable/ListUserProductsAvailableController";
import { CreateSubscriptionNewsletterController } from "@modules/accounts/useCases/createSubscriptionNewsletter/CreateSubscriptionNewsletterController";
import { UpdateUserSurveyFieldsController } from "@modules/accounts/useCases/updateUserSurveyFields/UpdateUserSurveyFieldsController";
import { UpdateUserLaborRiskAlertController } from "@modules/accounts/useCases/updateUserLaborRiskAlert/UpdateUserLaborRiskAlertController";

const usersRoutes = Router();

const createSubscriptionNewsletterController =
    new CreateSubscriptionNewsletterController();
usersRoutes.post(
    "/subscriptionNewsletter",
    createSubscriptionNewsletterController.handle
);

const createUserProductAvailableController =
    new CreateUserProductAvailableController();
usersRoutes.post(
    "/products",
    ensuredAuthenticated,
    createUserProductAvailableController.handle
);

const listUserProductsAvailableController =
    new ListUserProductsAvailableController();
usersRoutes.get(
    "/products",
    ensuredAuthenticated,
    listUserProductsAvailableController.handle
);

const updateUserAvatarController = new UpdateUserAvatarController();
const uploadAvatar = multer(uploadConfig);
usersRoutes.patch(
    "/avatar",
    ensuredAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.patch(
    "/avatar/:userId",
    ensuredAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

const createUserController = new CreateUserController();
usersRoutes.post("/", createUserController.handle);

const listUserController = new ListUserController();
usersRoutes.get(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    listUserController.handle
);

usersRoutes.get(
    "/:id",
    ensuredAuthenticated,
    listUserController.handle
);

const updateUserSurveyFieldsController = new UpdateUserSurveyFieldsController()
usersRoutes.put(
    "/updateSurveyFields",
    ensuredAuthenticated,
    updateUserSurveyFieldsController.handle
);

const updateUserLaborRiskAlertController = new UpdateUserLaborRiskAlertController()
usersRoutes.put(
    "/updateLaborRiskAlert",
    ensuredAuthenticated,
    updateUserLaborRiskAlertController.handle
);

export { usersRoutes };

