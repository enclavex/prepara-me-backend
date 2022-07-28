import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { CreateCompanyEmployeeUseCase } from "../createCompanyEmployee/CreateCompanyEmployeeUseCase";
import { RemoveCompanyEmployeeUseCase } from "./RemoveCompanyEmployeeUseCase";

let createCompanyEmployeeUseCase: CreateCompanyEmployeeUseCase;
let companyEmployeesRepositoryInMemory: CompanyEmployeesRepositoryInMemory;
let removeCompanyEmployeeUseCase: RemoveCompanyEmployeeUseCase;

describe("Remove Company Employee", () => {
    beforeEach(() => {
        companyEmployeesRepositoryInMemory =
            new CompanyEmployeesRepositoryInMemory();
        createCompanyEmployeeUseCase = new CreateCompanyEmployeeUseCase(
            companyEmployeesRepositoryInMemory
        );
        removeCompanyEmployeeUseCase = new RemoveCompanyEmployeeUseCase(
            companyEmployeesRepositoryInMemory
        );
    });

    it("should be able to delete a company employee", async () => {
        const companyEmployee1: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "123",
            documentId: "123",
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee1);

        const companyEmployee2: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "123",
            documentId: "123",
        };

        const companyEmployeeCreated =
            await createCompanyEmployeeUseCase.execute(companyEmployee2);

        const idRemoved = await removeCompanyEmployeeUseCase.execute(
            companyEmployeeCreated.id
        );

        expect(idRemoved).toBe(companyEmployeeCreated.id);
    });
});

