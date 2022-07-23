import { ICompaniesRepository } from "@modules/company/repositories/ICompaniesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveCompanyUseCase {
    constructor(
        @inject("CompaniesRepository")
        private companiesRepository: ICompaniesRepository
    ) {}

    async execute(id) {
        await this.companiesRepository.remove(id);
    }
}

export { RemoveCompanyUseCase };

