import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCompanyUseCase {
    constructor(
        @inject("CompaniesRepository")
        private companiesRepository: ICompaniesRepository
    ) {}

    async execute(name) {
        const companies = await this.companiesRepository.find({ name });

        return companies;
    }
}

export { ListCompanyUseCase };

