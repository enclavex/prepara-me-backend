import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployeeEasyRegisterEnum } from "@modules/company/enums/CompanyEmployeeEasyRegisterEnum";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { CreateCompanyEmployeeUseCase } from "../createCompanyEmployee/CreateCompanyEmployeeUseCase";
import { RemoveCompanyEmployeeUseCase } from "./RemoveCompanyEmployeeUseCase";

let createCompanyEmployeeUseCase: CreateCompanyEmployeeUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let companyEmployeesRepositoryInMemory: CompanyEmployeesRepositoryInMemory;
let removeCompanyEmployeeUseCase: RemoveCompanyEmployeeUseCase;

describe("Remove Company Employee", () => {
    beforeEach(() => {
        companyEmployeesRepositoryInMemory =
            new CompanyEmployeesRepositoryInMemory();
            usersRepositoryInMemory =
            new UsersRepositoryInMemory();
        createCompanyEmployeeUseCase = new CreateCompanyEmployeeUseCase(
            companyEmployeesRepositoryInMemory,
            usersRepositoryInMemory
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
            easyRegister: CompanyEmployeeEasyRegisterEnum.NO
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee1);

        const companyEmployee2: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "123",
            documentId: "123",
            easyRegister: CompanyEmployeeEasyRegisterEnum.NO
        };

        const companyEmployeeCreated =
            await createCompanyEmployeeUseCase.execute(companyEmployee2);

        const idRemoved = await removeCompanyEmployeeUseCase.execute(
            companyEmployeeCreated.id
        );

        expect(idRemoved).toBe(companyEmployeeCreated.id);
    });

    it("should be able to delete a company employee", async () => {
        const companyEmployee1: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "123",
            documentId: "123",
            easyRegister: CompanyEmployeeEasyRegisterEnum.NO
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee1);

        const companyEmployee2: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "123",
            documentId: "123",
            easyRegister: CompanyEmployeeEasyRegisterEnum.NO
        };

        const companyEmployeeCreated =
            await createCompanyEmployeeUseCase.execute(companyEmployee2);

        const idRemoved = await removeCompanyEmployeeUseCase.execute(
            companyEmployeeCreated.id
        );

        expect(idRemoved).toBe(companyEmployeeCreated.id);
    });
});

