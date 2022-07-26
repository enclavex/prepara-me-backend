import { ICreateCompanyDTO } from "@modules/company/dtos/ICreateCompanyDTO";
import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { getRepository, Repository } from "typeorm";
import { Company } from "../entities/Company";

class CompaniesRepository implements ICompaniesRepository {
    private repository: Repository<Company>;

    constructor() {
        this.repository = getRepository(Company);
    }

    async create({ name, id }: ICreateCompanyDTO): Promise<Company> {
        const company = this.repository.create({
            name,
            id,
        });

        await this.repository.save(company);

        return company;
    }

    async findById(id: string): Promise<Company> {
        const company = await this.repository.findOne(id);

        return company;
    }

    async find({ name, id }): Promise<Company[]> {
        const companiesQuery = this.repository
            .createQueryBuilder("c")
            .leftJoinAndSelect(
                "c.companySubscriptionPlan",
                "companySubscriptionPlans"
            )
            .leftJoinAndSelect(
                "companySubscriptionPlans.subscriptionPlan",
                "subscriptionPlans"
            );

        if (id) {
            companiesQuery.andWhere("c.id = :id", {
                id: id,
            });
        } else {
            if (name) {
                name = `%${name}%`;

                companiesQuery.andWhere("c.name like :name", {
                    name: name,
                });
            }
        }

        const companies = await companiesQuery.getMany();

        return companies;
    }

    async remove(id: string): Promise<void> {
        this.repository.delete(id);
    }
}

export { CompaniesRepository };

