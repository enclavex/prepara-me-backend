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
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { SpecialistRepository } from "@modules/specialists/infra/typeorm/repositories/SpecialistRepository";
import { IProductSpecialistRepository } from "@modules/specialists/repositories/IProductSpecialistRepository";
import { ProductSpecialistRepository } from "@modules/specialists/infra/typeorm/repositories/ProductSpecialistRepository";
import { ISpecialistScheduleAvailableRepository } from "@modules/specialists/repositories/ISpecialistScheduleAvailableRepository";
import { SpecialistScheduleAvailableRepository } from "@modules/specialists/infra/typeorm/repositories/SpecialistScheduleAvailableRepository";
import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { CompaniesRepository } from "@modules/company/infra/typeorm/repositories/CompaniesRepository";
import { ICompanyEmployeesRepository } from "@modules/company/repositories/ICompanyEmployeesRepository";
import { CompanyEmployeesRepository } from "@modules/company/infra/typeorm/repositories/CompanyEmployeesRepository";
import { SubscriptionPlansRepository } from "@modules/products/infra/typeorm/repositories/SubscriptionPlansRepository";
import { ISubscriptionPlansRepository } from "@modules/products/repositories/ISubscriptionPlansRepository";
import { ISubscriptionPlanProductsRepository } from "@modules/products/repositories/ISubscriptionPlanProductsRepository";
import { SubscriptionPlanProductsRepository } from "@modules/products/infra/typeorm/repositories/SubscriptionPlanProductsRepository";
import { ICompanySubscriptionPlansRepository } from "@modules/company/repositories/ICompanySubscriptionPlansRepository";
import { CompanySubscriptionPlansRepository } from "@modules/company/infra/typeorm/repositories/CompanySubscriptionPlansRepository";
import { IUserProductsAvailableRepository } from "@modules/accounts/repositories/IUserProductsAvailableRepository";
import { UserProductsAvailableRepository } from "@modules/accounts/infra/typeorm/repositories/UserProductsAvailableRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
    "UserTokensRepository",
    UserTokensRepository
);

container.registerSingleton<IUserProductsAvailableRepository>(
    "UserProductsAvailableRepository",
    UserProductsAvailableRepository
);

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
);

container.registerSingleton<IProductContentsRepository>(
    "ProductContentsRepository",
    ProductContentsRepository
);

container.registerSingleton<ISpecialistsRepository>(
    "SpecialistRepository",
    SpecialistRepository
);

container.registerSingleton<ISpecialistScheduleAvailableRepository>(
    "SpecialistScheduleAvailableRepository",
    SpecialistScheduleAvailableRepository
);

container.registerSingleton<IProductSpecialistRepository>(
    "ProductSpecialistRepository",
    ProductSpecialistRepository
);

container.registerSingleton<ICompaniesRepository>(
    "CompaniesRepository",
    CompaniesRepository
);

container.registerSingleton<ICompanyEmployeesRepository>(
    "CompanyEmployeesRepository",
    CompanyEmployeesRepository
);

container.registerSingleton<ICompanySubscriptionPlansRepository>(
    "CompanySubscriptionPlansRepository",
    CompanySubscriptionPlansRepository
);

container.registerSingleton<ISubscriptionPlansRepository>(
    "SubscriptionPlansRepository",
    SubscriptionPlansRepository
);

container.registerSingleton<ISubscriptionPlanProductsRepository>(
    "SubscriptionPlanProductsRepository",
    SubscriptionPlanProductsRepository
);
