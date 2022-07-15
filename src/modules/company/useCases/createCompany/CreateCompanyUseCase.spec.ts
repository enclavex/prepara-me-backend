import { ICreateCompanyDTO } from "@modules/company/dtos/ICreateCompanyDTO";
import { CompaniesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompaniesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
let createCompanyUseCase: CreateCompanyUseCase;

describe("Create Company", () => {
    beforeEach(() => {
        companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
        createCompanyUseCase = new CreateCompanyUseCase(
            companiesRepositoryInMemory
        );
    });

    it("should be able to create a new company", async () => {
        const company: ICreateCompanyDTO = {
            name: "Company Test",
        };

        const result = await createCompanyUseCase.execute(company);

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a company without a name", async () => {
        expect(async () => {
            const company: ICreateCompanyDTO = {
                name: "",
            };

            await createCompanyUseCase.execute(company);
        }).rejects.toBeInstanceOf(AppError);
    });
});
