import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { SimulatorVideosGroupActiveEnum } from "@modules/products/enums/SimulatorVideosGroupActiveEnum";
import { SimulatorVideosGroup } from "@modules/products/infra/typeorm/entities/SimulatorVideosGroup";
import { IResponseSimulatorVideosGroupDTO } from "../dtos/IResponseSimulatorVideosGroupDTO";

interface IRequestFind {
    name?: string;
    active?: SimulatorVideosGroupActiveEnum;
    id?: string;
}

interface ISimulatorVideosGroupsRepository {
    create(data: ICreateSimulatorVideosGroupDTO): Promise<SimulatorVideosGroup>;
    find(data: IRequestFind): Promise<IResponseSimulatorVideosGroupDTO[]>;
    remove(id: string): Promise<void>;
}

export { ISimulatorVideosGroupsRepository };

