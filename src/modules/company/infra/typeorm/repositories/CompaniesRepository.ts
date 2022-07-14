import { ICreateCompanyDTO } from "@modules/company/dtos/ICreateCompanyDTO";
import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { getRepository, Repository } from "typeorm";
import { Company } from "../entities/Company";

class CompaniesRepository implements ICompaniesRepository {
    private repository: Repository<Company>;

    constructor() {
        this.repository = getRepository(Company);
    }

    async create({ name }: ICreateCompanyDTO): Promise<Company> {
        const company = this.repository.create({
            name,
        });

        await this.repository.save(company);

        return company;
    }

    async findById(id: string): Promise<Company> {
        const company = await this.repository.findOne(id);

        return company;
    }

    async find(): Promise<Company[]> {
        const companies = await this.repository.find();

        return companies;
    }
}

export { CompaniesRepository };

