import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { ICompanyEmployees } from "@modules/company/repositories/ICompanyEmployees";
import { getRepository, Repository } from "typeorm";
import { CompanyEmployee } from "../entities/CompanyEmployee";

class CompanyEmployeesRepository implements ICompanyEmployees {
    private repository: Repository<CompanyEmployee>;

    constructor() {
        this.repository = getRepository(CompanyEmployee);
    }

    async create({
        companyId,
        documentId,
        name,
        subscribeToken,
        userId,
    }: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee> {
        const companyEmployee = this.repository.create({
            companyId,
            documentId,
            name,
            subscribeToken,
            userId,
        });

        await this.repository.save(companyEmployee);

        return companyEmployee;
    }

    async findByDocumentId(documentId: string): Promise<CompanyEmployee> {
        const companyEmployee = await this.repository.findOne(documentId);
        return companyEmployee;
    }
}

export { CompanyEmployeesRepository };

