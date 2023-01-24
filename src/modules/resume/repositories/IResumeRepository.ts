import { ICreateResumeDTO } from "../dtos/ICreateResumeDTO";
import { Resume } from "../infra/typeorm/entities/Resume";

interface IRequestFind {
    userId?: string;
    id?: string;
}

interface IResumeRepository {
    create(data: ICreateResumeDTO): Promise<Resume>;
    find(data: IRequestFind): Promise<Resume[]>;
    remove(id: string): Promise<void>;
}

export { IResumeRepository };

