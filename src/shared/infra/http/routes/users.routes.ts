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

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const createUserProductAvailableController =
    new CreateUserProductAvailableController();
const listUserProductsAvailableController =
    new ListUserProductsAvailableController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listUserController = new ListUserController();

usersRoutes.post(
    "/products",
    ensuredAuthenticated,
    ensureAdmin,
    createUserProductAvailableController.handle
);

usersRoutes.get(
    "/products",
    ensuredAuthenticated,
    listUserProductsAvailableController.handle
);

usersRoutes.patch(
    "/avatar",
    ensuredAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.post("/", createUserController.handle);

usersRoutes.get(
    "/",
    ensuredAuthenticated,
    ensureAdmin,
    listUserController.handle
);
usersRoutes.get(
    "/:id",
    ensuredAuthenticated,
    ensureAdmin,
    listUserController.handle
);

export { usersRoutes };

