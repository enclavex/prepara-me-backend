import { SubscriptionPlansRepository } from "@modules/products/infra/typeorm/repositories/SubscriptionPlansRepository";
import { ISubscriptionPlansRepository } from "@modules/products/repositories/ISubscriptionPlansRepository";
import { ISubscriptionPlanProductsRepository } from "@modules/products/repositories/ISubscriptionPlanProductsRepository";
import { SubscriptionPlanProductsRepository } from "@modules/products/infra/typeorm/repositories/SubscriptionPlanProductsRepository";
import { container, delay } from 'tsyringe';

container.registerSingleton<ISubscriptionPlansRepository>(
    "SubscriptionPlansRepository",
    delay(() => SubscriptionPlansRepository)
);

container.registerSingleton<ISubscriptionPlanProductsRepository>(
    "SubscriptionPlanProductsRepository",
    delay(() => SubscriptionPlanProductsRepository)
);
