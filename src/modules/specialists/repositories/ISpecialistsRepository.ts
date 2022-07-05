import { ICreateSpecialistDTO } from "../dtos/ICreateSpecialistDTO";
import { ISpecialistResponseDTO } from "../dtos/ISpecialistResponseDTO";
import { Specialist } from "../infra/typeorm/entities/Specialist";

interface ISpecialistsRepository {
    create(data: ICreateSpecialistDTO): Promise<Specialist>
    findById(id: string): Promise<Specialist>
    findByIds(
        ids: string[],
        dateBegin?: Date,
        dateEnd?: Date
    ): Promise<ISpecialistResponseDTO[]>
    findAvailable(
        dateBegin?: Date,
        dateEnd?: Date
    ): Promise<Specialist[]>;
}

export { ISpecialistsRepository }