import { ICreateCompanyDTO } from "@modules/company/dtos/ICreateCompanyDTO";
import { Company } from "@modules/company/infra/typeorm/entities/Company";
import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCompanyUseCase {
    constructor(
        @inject("CompaniesRepository")
        private companiesRepository: ICompaniesRepository
    ) {}

    async execute({ id, name }: ICreateCompanyDTO): Promise<Company> {
        if (!name) {
            throw new AppError("Name can't be null");
        }

        const company = await this.companiesRepository.create({
            id,
            name,
        });

        return company;
    }
}

export { CreateCompanyUseCase };
