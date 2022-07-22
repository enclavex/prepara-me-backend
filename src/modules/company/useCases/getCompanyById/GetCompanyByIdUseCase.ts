import { Company } from "@modules/company/infra/typeorm/entities/Company";
import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class GetCompanyByIdUseCase {
    constructor(
        @inject("CompaniesRepository")
        private companiesRepository: ICompaniesRepository
    ) {}

    async execute(id): Promise<Company> {
        if (!id) {
            throw new AppError("ID can't be null");
        }

        const company = await this.companiesRepository.findById(id);

        return company;
    }
}

export { GetCompanyByIdUseCase };
