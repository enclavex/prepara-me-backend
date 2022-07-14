import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployee } from "@modules/company/infra/typeorm/entities/CompanyEmployee";
import { ICompanyEmployees } from "../ICompanyEmployees";

class CompanyEmployeesRepositoryInMemory implements ICompanyEmployees {
    companyEmployees: CompanyEmployee[] = [];

    async create({
        companyId,
        documentId,
        name,
        userId,
    }: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee> {
        const companyEmployee = new CompanyEmployee(
            name,
            companyId,
            documentId,
            userId
        );

        this.companyEmployees.push(companyEmployee);

        return companyEmployee;
    }

    async findByDocumentId(documentId: string): Promise<CompanyEmployee> {
        return this.companyEmployees.find(
            (companyEmployee) => companyEmployee.documentId === documentId
        );
    }
}

export { CompanyEmployeesRepositoryInMemory };

