import { container, delay } from 'tsyringe';
import { ProductContentsRepository } from "@modules/products/infra/typeorm/repositories/ProductContentsRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IProductContentsRepository } from "@modules/products/repositories/IProductContentsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { IRequestScheduleRepository } from "@modules/products/repositories/IRequestScheduleRepository";
import { RequestScheduleRepository } from "@modules/products/infra/typeorm/repositories/RequestScheduleRepository";
import { ISimulatorVideosGroupsRepository } from "@modules/products/repositories/ISimulatorVideosGroupsRepository";
import { ISimulatorVideosRepository } from "@modules/products/repositories/ISimulatorVideosRepository";
import { SimulatorVideosGroupRepository } from "@modules/products/infra/typeorm/repositories/SimulatorVideosGroupRepository";
import { SimulatorVideosRepository } from "@modules/products/infra/typeorm/repositories/SimulatorVideosRepository";

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    delay(() => ProductsRepository)
);

container.registerSingleton<IProductContentsRepository>(
    "ProductContentsRepository",
    delay(() => ProductContentsRepository)
);

container.registerSingleton<IRequestScheduleRepository>(
    "RequestScheduleRepository",
    delay(() => RequestScheduleRepository)
);

container.registerSingleton<ISimulatorVideosGroupsRepository>(
    "SimulatorVideosGroupsRepository",
    delay(() => SimulatorVideosGroupRepository)
);

container.registerSingleton<ISimulatorVideosRepository>(
    "SimulatorVideosRepository",
    delay(() => SimulatorVideosRepository)
);
