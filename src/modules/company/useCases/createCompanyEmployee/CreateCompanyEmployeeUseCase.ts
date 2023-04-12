import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployee } from "@modules/company/infra/typeorm/entities/CompanyEmployee";
import { ICompanyEmployeesRepository } from "@modules/company/repositories/ICompanyEmployeesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCompanyEmployeeUseCase {
    constructor(
        @inject("CompanyEmployeesRepository")
        private companyEmployeesRepository: ICompanyEmployeesRepository
    ) {}

    async execute({
        companyId,
        documentId,
        name,
        subscribeToken,
        userId,
        phone,
        email,
        id,
        easyRegister,
    }: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee> {
        if (!name) {
            throw new AppError("Name can't be null");
        }

        if (!companyId) {
            throw new AppError("Company Id can't be null");
        }

        if (!documentId) {
            throw new AppError("Document Id can't be null");
        }

        if (!easyRegister) {
            throw new AppError("easyRegister can't be null");
        }

        const companyEmployee = await this.companyEmployeesRepository.create({
            companyId,
            documentId,
            name,
            userId,
            subscribeToken,
            phone,
            email,
            id,
            easyRegister
        });

        return companyEmployee;
    }
}

export { CreateCompanyEmployeeUseCase };

