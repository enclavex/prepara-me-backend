import { ICompanySubscriptionPlansRepository } from "@modules/company/repositories/ICompanySubscriptionPlansRepository";
import { CompanySubscriptionPlansRepository } from "@modules/company/infra/typeorm/repositories/CompanySubscriptionPlansRepository";
import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { CompaniesRepository } from "@modules/company/infra/typeorm/repositories/CompaniesRepository";
import { ICompanyEmployeesRepository } from "@modules/company/repositories/ICompanyEmployeesRepository";
import { CompanyEmployeesRepository } from "@modules/company/infra/typeorm/repositories/CompanyEmployeesRepository";
import { container, delay } from 'tsyringe';

container.registerSingleton<ICompaniesRepository>(
    "CompaniesRepository",
    delay(() => CompaniesRepository)
);

container.registerSingleton<ICompanyEmployeesRepository>(
    "CompanyEmployeesRepository",
    delay(() => CompanyEmployeesRepository)
);

container.registerSingleton<ICompanySubscriptionPlansRepository>(
    "CompanySubscriptionPlansRepository",
    delay(() => CompanySubscriptionPlansRepository)
);