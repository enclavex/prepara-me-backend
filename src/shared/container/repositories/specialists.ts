import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { SpecialistsRepository } from "@modules/specialists/infra/typeorm/repositories/SpecialistsRepository";
import { SpecialistSchedulesAvailablesRepository } from "@modules/specialists/infra/typeorm/repositories/SpecialistSchedulesAvailablesRepository";
import { ProductsSpecialistsRepository } from "@modules/specialists/infra/typeorm/repositories/ProductsSpecialistsRepository";
import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { ISpecialistSchedulesAvailablesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesAvailablesRepository";
import { container } from "tsyringe";

container.registerSingleton<ISpecialistsRepository>(
    "SpecialistsRepository",
    SpecialistsRepository
);

container.registerSingleton<ISpecialistSchedulesAvailablesRepository>(
    "SpecialistSchedulesAvailablesRepository",
    SpecialistSchedulesAvailablesRepository
);

container.registerSingleton<IProductsSpecialistsRepository>(
    "ProductsSpecialistsRepository",
    ProductsSpecialistsRepository
);