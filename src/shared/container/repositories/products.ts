import { container } from "tsyringe";
import { ProductContentsRepository } from "@modules/products/infra/typeorm/repositories/ProductContentsRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IProductContentsRepository } from "@modules/products/repositories/IProductContentsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { IRequestScheduleRepository } from "@modules/products/repositories/IRequestScheduleRepository";
import { RequestScheduleRepository } from "@modules/products/infra/typeorm/repositories/RequestScheduleRepository";

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
);

container.registerSingleton<IProductContentsRepository>(
    "ProductContentsRepository",
    ProductContentsRepository
);

container.registerSingleton<IRequestScheduleRepository>(
    "RequestScheduleRepository",
    RequestScheduleRepository
);