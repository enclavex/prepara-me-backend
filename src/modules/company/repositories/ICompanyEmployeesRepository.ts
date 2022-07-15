import { ICreateCompanyEmployeeDTO } from "../dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployee } from "../infra/typeorm/entities/CompanyEmployee";

interface ICompanyEmployeesRepository {
    create(data: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee>;
    findByDocumentId(documentId: string): Promise<CompanyEmployee>;
}

export { ICompanyEmployeesRepository };
