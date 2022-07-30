import { ICreateCompanyEmployeeDTO } from "../dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployee } from "../infra/typeorm/entities/CompanyEmployee";

interface IRequestFind {
    companyId?: string;
    name?: string;
    documentId?: string;
    userId?: string;
    phone?: string;
    email?: string;
    id?: string;
}

interface ICompanyEmployeesRepository {
    create(data: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee>;
    find(data: IRequestFind): Promise<CompanyEmployee[]>;
    remove(id: string): Promise<string>;
}

export { ICompanyEmployeesRepository };

