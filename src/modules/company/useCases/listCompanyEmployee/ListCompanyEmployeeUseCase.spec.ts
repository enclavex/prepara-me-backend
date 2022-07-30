import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { CreateCompanyEmployeeUseCase } from "../createCompanyEmployee/CreateCompanyEmployeeUseCase";
import { ListCompanyEmployeeUseCase } from "./ListCompanyEmployeeUseCase";

let companyEmployeesRepositoryInMemory: CompanyEmployeesRepositoryInMemory;
let listCompanyEmployeeUseCase: ListCompanyEmployeeUseCase;
let createCompanyEmployeeUseCase: CreateCompanyEmployeeUseCase;

describe("List Company Employees", () => {
    beforeEach(() => {
        companyEmployeesRepositoryInMemory =
            new CompanyEmployeesRepositoryInMemory();
        listCompanyEmployeeUseCase = new ListCompanyEmployeeUseCase(
            companyEmployeesRepositoryInMemory
        );
        createCompanyEmployeeUseCase = new CreateCompanyEmployeeUseCase(
            companyEmployeesRepositoryInMemory
        );
    });

    it("should be able to list company employees", async () => {
        const companyEmployee1: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "teste",
            documentId: "123",
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee1);

        const companyEmployee2: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "teste",
            documentId: "123",
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee2);

        const result = await listCompanyEmployeeUseCase.execute({
            documentId: "",
            email: "",
            phone: "",
            userId: "",
            name: "",
            id: "",
        });

        expect(result).toHaveLength(2);
    });

    it("should be able to list company filtered by name", async () => {
        const companyEmployee1: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "teste",
            documentId: "123",
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee1);

        const companyEmployee2: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste 2",
            subscribeToken: "teste",
            documentId: "123",
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee2);

        const result = await listCompanyEmployeeUseCase.execute({
            documentId: "",
            email: "",
            phone: "",
            userId: "",
            name: "teste 2",
            id: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list company filtered by documentId", async () => {
        const companyEmployee1: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste",
            subscribeToken: "teste",
            documentId: "123",
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee1);

        const companyEmployee2: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            name: "teste 2",
            subscribeToken: "teste",
            documentId: "321",
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee2);

        const result = await listCompanyEmployeeUseCase.execute({
            documentId: "123",
            email: "",
            phone: "",
            userId: "",
            name: "",
            id: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list company filtered by email", async () => {
        const companyEmployee1: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            documentId: "321",
            name: "teste 2",
            subscribeToken: "teste",
            userId: "",
            phone: "8888888",
            email: "teste1@teste.com",
            id: ""
        };
        
        await createCompanyEmployeeUseCase.execute(companyEmployee1);
        
        const companyEmployee2: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            documentId: "321",
            name: "teste 2",
            subscribeToken: "teste",
            userId: "",
            phone: "8888888",
            email: "teste2@teste.com",
            id: ""
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee2);

        const result = await listCompanyEmployeeUseCase.execute({
            documentId: "",
            email: "teste2@teste.com",
            phone: "",
            userId: "",
            name: "",
            id: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list company filtered by phone", async () => {
        const companyEmployee1: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            documentId: "321",
            name: "teste 2",
            subscribeToken: "teste",
            userId: "",
            phone: "9999999",
            email: "teste2@teste.com",
            id: ""
        };
        
        await createCompanyEmployeeUseCase.execute(companyEmployee1);
        
        const companyEmployee2: ICreateCompanyEmployeeDTO = {
            companyId: "123",
            documentId: "321",
            name: "teste 2",
            subscribeToken: "teste",
            userId: "",
            phone: "8888888",
            email: "teste2@teste.com",
            id: ""
        };

        await createCompanyEmployeeUseCase.execute(companyEmployee2);

        const result = await listCompanyEmployeeUseCase.execute({
            name: "",
            documentId: "",
            userId: "",
            phone: "8888888",
            email: "",
            id: "",
        });

        expect(result).toHaveLength(1);
    });
});
