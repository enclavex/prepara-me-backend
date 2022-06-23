import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { ProductContentsRepository } from "@modules/products/infra/typeorm/repositories/ProductContentsRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IProductContentsRepository } from "@modules/products/repositories/IProductContentsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { container } from "tsyringe";
import "./providers";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
    "UserTokensRepository",
    UserTokensRepository
);

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
);

container.registerSingleton<IProductContentsRepository>(
    "ProductContentsRepository",
    ProductContentsRepository
);
