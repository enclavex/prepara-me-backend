import { ICreateCompanyEmployeeDTO } from "../dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployee } from "../infra/typeorm/entities/CompanyEmployee";

interface ICompanyEmployees {
    create(data: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee>;
    findByDocumentId(documentId: string): Promise<CompanyEmployee>;
}

export { ICompanyEmployees };
