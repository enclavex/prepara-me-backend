import { ICompanyEmployeesRepository } from "@modules/company/repositories/ICompanyEmployeesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveCompanyEmployeeUseCase {
    constructor(
        @inject("CompanyEmployeesRepository")
        private companyEmployees: ICompanyEmployeesRepository
    ) {}

    async execute(id) {
        return await this.companyEmployees.remove(id);
    }
}

export { RemoveCompanyEmployeeUseCase };
