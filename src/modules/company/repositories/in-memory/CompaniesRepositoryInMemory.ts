import { ICreateCompanyDTO } from "@modules/company/dtos/ICreateCompanyDTO";
import { Company } from "@modules/company/infra/typeorm/entities/Company";
import { ICompaniesRepository } from "../ICompaniesRepository";

class CompaniesRepositoryInMemory implements ICompaniesRepository {
    companies: Company[] = [];

    async create({ name, id }: ICreateCompanyDTO): Promise<Company> {
        const company = new Company(name, id);

        this.companies.push(company);

        return company;
    }

    async findById(id: string): Promise<Company> {
        return this.companies.find((company) => company.id === id);
    }

    async find({ name, id }): Promise<Company[]> {
        let companies = this.companies;

        if (id) {
            companies = companies.filter((company) => {
                return company.id === id;
            });
        } else {
            if (name) {
                companies = companies.filter((company) => {
                    return company.name.includes(name);
                });
            }
        }

        return companies;
    }

    async remove(id: string) {
        this.companies = this.companies.filter((company) => {
            return id !== company.id;
        });
    }
}

export { CompaniesRepositoryInMemory };

