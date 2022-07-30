import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { ICompanyEmployeesRepository } from "@modules/company/repositories/ICompanyEmployeesRepository";
import { getRepository, Repository } from "typeorm";
import { CompanyEmployee } from "../entities/CompanyEmployee";

class CompanyEmployeesRepository implements ICompanyEmployeesRepository {
    private repository: Repository<CompanyEmployee>;

    constructor() {
        this.repository = getRepository(CompanyEmployee);
    }

    async create({
        companyId,
        documentId,
        name,
        subscribeToken,
        userId,
        phone,
        email,
        id,
    }: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee> {
        const companyEmployee = this.repository.create({
            companyId,
            documentId,
            name,
            subscribeToken,
            userId,
            phone,
            email,
            id,
        });

        await this.repository.save(companyEmployee);

        return companyEmployee;
    }

    async find({
        name,
        documentId,
        userId,
        phone,
        email,
        companyId,
        id,
    }): Promise<CompanyEmployee[]> {
        const companyEmployeesQuery = this.repository
            .createQueryBuilder("ce")
            .leftJoinAndSelect("ce.user", "u")
            .leftJoinAndSelect("ce.company", "c");

        if (id) {
            companyEmployeesQuery.andWhere("ce.id = :id", {
                id: id,
            });
        } else {
            if (name) {
                name = `%${name}%`;

                companyEmployeesQuery.andWhere("ce.name like :name", {
                    name: name,
                });
            }

            if (documentId) {
                companyEmployeesQuery.andWhere("ce.documentId = :documentId", {
                    documentId: documentId,
                });
            }

            if (companyId) {
                companyEmployeesQuery.andWhere("ce.companyId = :companyId", {
                    companyId: companyId,
                });
            }

            if (userId) {
                companyEmployeesQuery.andWhere("ce.userId = :userId", {
                    userId: userId,
                });
            }

            if (phone) {
                companyEmployeesQuery.andWhere("ce.phone = :phone", {
                    phone: phone,
                });
            }

            if (email) {
                companyEmployeesQuery.andWhere("ce.email = :email", {
                    email: email,
                });
            }
        }

        const companyEmployees = await companyEmployeesQuery.getMany();


        return companyEmployees;
    }

    async remove(id: string): Promise<string> {
        this.repository.delete(id);

        return id
    }
}

export { CompanyEmployeesRepository };

