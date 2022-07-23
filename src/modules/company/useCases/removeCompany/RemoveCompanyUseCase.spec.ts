import { ICreateCompanyDTO } from "@modules/company/dtos/ICreateCompanyDTO";
import { CompaniesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompaniesRepositoryInMemory";
import { CreateCompanyUseCase } from "../createCompany/CreateCompanyUseCase";
import { ListCompanyUseCase } from "../listCompany/ListCompanyUseCase";
import { RemoveCompanyUseCase } from "./RemoveCompanyUseCase";

let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
let listCompanyUseCase: ListCompanyUseCase;
let createCompanyUseCase: CreateCompanyUseCase;
let removeCompanyUseCase: RemoveCompanyUseCase;

describe("Remove Subscription Plans", () => {
    beforeEach(() => {
        companiesRepositoryInMemory =
            new CompaniesRepositoryInMemory();
        listCompanyUseCase = new ListCompanyUseCase(
            companiesRepositoryInMemory
        );
        createCompanyUseCase = new CreateCompanyUseCase(
            companiesRepositoryInMemory
        );
        removeCompanyUseCase = new RemoveCompanyUseCase(
            companiesRepositoryInMemory
        );
    });

    it("should be able to delete a subscription plans", async () => {
        const Company1: ICreateCompanyDTO = {
            name: "Company One",
        };

        await createCompanyUseCase.execute(Company1);

        const Company2: ICreateCompanyDTO = {
            name: "Company Two",
        };

        const CompanyCreated = await createCompanyUseCase.execute(Company2);

        await removeCompanyUseCase.execute(CompanyCreated.id);

        const result = await listCompanyUseCase.execute("");

        expect(result).toHaveLength(1);
    });
})