import { ICompanyEmployeeResponseDTO } from "@modules/company/dtos/ICompanyEmployeeResponseDTO";
import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployee } from "@modules/company/infra/typeorm/entities/CompanyEmployee";
import { CompanyEmployeeMap } from "@modules/company/mapper/CompanyEmployeeMap";
import { ICompanyEmployeesRepository } from "../ICompanyEmployeesRepository";

class CompanyEmployeesRepositoryInMemory
    implements ICompanyEmployeesRepository
{
    companyEmployees: CompanyEmployee[] = [];

    async create({
        companyId,
        documentId,
        name,
        userId,
        subscribeToken,
        phone,
        email,
        id,
        easyRegister
    }: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee> {
        const companyEmployee = new CompanyEmployee(
            name,
            subscribeToken,
            companyId,
            documentId,
            phone,
            email,
            userId,
            id,
            easyRegister
        );

        this.companyEmployees.push(companyEmployee);

        return companyEmployee;
    }

    async find({
        name,
        documentId,
        companyId,
        userId,
        notUserId,
        phone,
        email,
        id,
    }): Promise<ICompanyEmployeeResponseDTO[]> {
        let companyEmployees = this.companyEmployees;

        if (id) {
            companyEmployees = companyEmployees.filter((companyEmployee) => {
                return companyEmployee.id === id;
            });
        } else {
            if (name) {
                companyEmployees = companyEmployees.filter(
                    (companyEmployee) => {
                        return companyEmployee.name.includes(name);
                    }
                );
            }

            if (userId) {
                companyEmployees = companyEmployees.filter(
                    (companyEmployee) => {
                        return companyEmployee.userId === userId;
                    }
                );
            }

            if (notUserId) {
                companyEmployees = companyEmployees.filter(
                    (companyEmployee) => {
                        return !companyEmployee.userId;
                    }
                );
            }

            if (companyId) {
                companyEmployees = companyEmployees.filter(
                    (companyEmployee) => {
                        return companyEmployee.companyId === companyId;
                    }
                );
            }

            if (documentId) {
                companyEmployees = companyEmployees.filter(
                    (companyEmployee) => {
                        return companyEmployee.documentId === documentId;
                    }
                );
            }

            if (phone) {
                companyEmployees = companyEmployees.filter(
                    (companyEmployee) => {
                        return companyEmployee.phone === phone;
                    }
                );
            }

            if (email) {
                companyEmployees = companyEmployees.filter(
                    (companyEmployee) => {
                        return companyEmployee.email === email;
                    }
                );
            }
        }

        const companyEmployeesMapped = companyEmployees.map(
            (companyEmployee) => {
                return CompanyEmployeeMap.toDTO(companyEmployee);
            }
        );

        return companyEmployeesMapped;
    }

    async remove(id: string): Promise<string> {
        this.companyEmployees = this.companyEmployees.filter((company) => {
            return id !== company.id;
        });

        return id;
    }
}

export { CompanyEmployeesRepositoryInMemory };

