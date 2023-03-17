import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { SpecialistsRepository } from "@modules/specialists/infra/typeorm/repositories/SpecialistsRepository";
import { ProductsSpecialistsRepository } from "@modules/specialists/infra/typeorm/repositories/ProductsSpecialistsRepository";
import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { ISpecialistSchedulesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesRepository";
import { container, delay } from 'tsyringe';
import { SpecialistSchedulesRepository } from "@modules/specialists/infra/typeorm/repositories/SpecialistSchedulesRepository";

container.registerSingleton<ISpecialistsRepository>(
    "SpecialistsRepository",
    delay(() => SpecialistsRepository)
);

container.registerSingleton<ISpecialistSchedulesRepository>(
    "SpecialistSchedulesRepository",
    delay(() => SpecialistSchedulesRepository)
);

container.registerSingleton<IProductsSpecialistsRepository>(
    "ProductsSpecialistsRepository",
    delay(() => ProductsSpecialistsRepository)
);