import { ICreateSpecialistDTO } from "../dtos/ICreateSpecialistDTO";
import { Specialist } from "../infra/typeorm/entities/Specialist";

interface ISpecialistsRepository {
    create(data: ICreateSpecialistDTO): Promise<Specialist>
    findById(id: string): Promise<Specialist>
    findAvailable(): Promise<Specialist[]>;
}

export { ISpecialistsRepository }