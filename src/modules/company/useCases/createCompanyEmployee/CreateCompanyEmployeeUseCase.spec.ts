import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCompanyEmployeeUseCase } from "./CreateCompanyEmployeeUseCase";

let companyEmployeesRepositoryInMemory: CompanyEmployeesRepositoryInMemory;
let createCompanyEmployeeUseCase: CreateCompanyEmployeeUseCase;

describe("Create Company Employee", () => {
    beforeEach(() => {
        companyEmployeesRepositoryInMemory =
            new CompanyEmployeesRepositoryInMemory();
        createCompanyEmployeeUseCase = new CreateCompanyEmployeeUseCase(
            companyEmployeesRepositoryInMemory
        );
    });

    it("shold be able to create a new company employee", async () => {
        const companyEmployee: ICreateCompanyEmployeeDTO = {
            name: "Employee Test",
            companyId: "123",
            documentId: "123",
            subscribeToken: "123",
        };

        const result = await createCompanyEmployeeUseCase.execute(
            companyEmployee
        );

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a company employee without a name", async () => {
        expect(async () => {
            const companyEmployee: ICreateCompanyEmployeeDTO = {
                name: "",
                companyId: "123",
                documentId: "123",
                subscribeToken: "123",
            };

            await createCompanyEmployeeUseCase.execute(companyEmployee);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a company employee without a company Id", async () => {
        expect(async () => {
            const companyEmployee: ICreateCompanyEmployeeDTO = {
                name: "Employee Test",
                companyId: "",
                documentId: "123",
                subscribeToken: "123",
            };

            await createCompanyEmployeeUseCase.execute(companyEmployee);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a company employee without a document Id", async () => {
        expect(async () => {
            const companyEmployee: ICreateCompanyEmployeeDTO = {
                name: "Employee Test",
                companyId: "123",
                documentId: "",
                subscribeToken: "123",
            };

            await createCompanyEmployeeUseCase.execute(companyEmployee);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a company employee without a subscribeToken", async () => {
        expect(async () => {
            const companyEmployee: ICreateCompanyEmployeeDTO = {
                name: "Employee Test",
                companyId: "123",
                documentId: "123",
                subscribeToken: "",
            };

            await createCompanyEmployeeUseCase.execute(companyEmployee);
        }).rejects.toBeInstanceOf(AppError);
    });
});

