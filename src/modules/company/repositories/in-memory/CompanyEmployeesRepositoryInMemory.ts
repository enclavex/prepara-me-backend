import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployee } from "@modules/company/infra/typeorm/entities/CompanyEmployee";
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
    }: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee> {
        const companyEmployee = new CompanyEmployee(
            name,
            subscribeToken,
            companyId,
            documentId,
            phone,
            email,
            userId,
            id
        );

        this.companyEmployees.push(companyEmployee);

        return companyEmployee;
    }

    async find({
        name,
        documentId,
        userId,
        phone,
        email,
        id,
    }): Promise<CompanyEmployee[]> {
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

        return companyEmployees;
    }

    async remove(id: string): Promise<string> {
        this.companyEmployees = this.companyEmployees.filter((company) => {
            return id !== company.id;
        });

        return id
    }
}

export { CompanyEmployeesRepositoryInMemory };

