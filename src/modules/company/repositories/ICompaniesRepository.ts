import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";
import { Company } from "../infra/typeorm/entities/Company";

interface IRequestFind {
    name?: string;
}

interface ICompaniesRepository {
    create(data: ICreateCompanyDTO): Promise<Company>;
    findById(id: string): Promise<Company>;
    find(data: IRequestFind): Promise<Company[]>;
}

export { ICompaniesRepository };
