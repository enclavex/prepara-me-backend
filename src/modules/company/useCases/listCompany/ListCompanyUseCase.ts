import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCompanyUseCase {
    constructor(
        @inject("CompaniesRepository")
        private companiesRepository: ICompaniesRepository
    ) {}

    async execute({ name, id }) {
        const companies = await this.companiesRepository.find({ name, id });

        return companies;
    }
}

export { ListCompanyUseCase };

