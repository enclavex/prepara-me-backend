import { ICreateSpecialistDTO } from "../dtos/ICreateSpecialistDTO";
import { ISpecialistResponseDTO } from "../dtos/ISpecialistResponseDTO";
import { SpecialistStatusEnum } from "../enums/SpecialistStatusEnum";
import { Specialist } from "../infra/typeorm/entities/Specialist";

interface IRequestFind {
    dateBegin?: Date;
    dateEnd?: Date;
    name?: string;
    userId?: string;
    status?: SpecialistStatusEnum;
    id?: string;
}

interface ISpecialistsRepository {
    create(data: ICreateSpecialistDTO): Promise<Specialist>;
    findById(id: string): Promise<Specialist>;
    findByIds(
        ids: string[],
        dateBegin?: Date,
        dateEnd?: Date
    ): Promise<ISpecialistResponseDTO[]>;
    find(data: IRequestFind): Promise<ISpecialistResponseDTO[]>;
}

export { ISpecialistsRepository };
