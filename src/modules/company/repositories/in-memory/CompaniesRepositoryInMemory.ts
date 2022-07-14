import { ICreateCompanyDTO } from "@modules/company/dtos/ICreateCompanyDTO";
import { Company } from "@modules/company/infra/typeorm/entities/Company";
import { ICompaniesRepository } from "../ICompaniesRepository";

class CompaniesRepositoryInMemory implements ICompaniesRepository {
    companies: Company[] = [];

    async create({ name }: ICreateCompanyDTO): Promise<Company> {
        const company = new Company(name);

        this.companies.push(company);

        return company;
    }

    async findById(id: string): Promise<Company> {
        return this.companies.find((company) => company.id === id);
    }

    async find(): Promise<Company[]> {
        return this.companies;
    }
}

export { CompaniesRepositoryInMemory };
