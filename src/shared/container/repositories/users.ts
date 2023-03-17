import { container, delay } from 'tsyringe';
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IUserProductsAvailableRepository } from "@modules/accounts/repositories/IUserProductsAvailableRepository";
import { UserProductsAvailableRepository } from "@modules/accounts/infra/typeorm/repositories/UserProductsAvailableRepository";
import { SubscriptionNewslettersRepository } from "@modules/accounts/infra/typeorm/repositories/SubscriptionNewslettersRepository";
import { ISubscriptionNewslettersRepository } from "@modules/accounts/repositories/ISubcriptionNewslettersRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    delay(() => UsersRepository)
);

container.registerSingleton<IUserTokensRepository>(
    "UserTokensRepository",
    delay(() => UserTokensRepository)
);

container.registerSingleton<IUserProductsAvailableRepository>(
    "UserProductsAvailableRepository",
    delay(() => UserProductsAvailableRepository)
);

container.registerSingleton<ISubscriptionNewslettersRepository>(
    "SubscriptionNewslettersRepository",
    delay(() => SubscriptionNewslettersRepository)
)