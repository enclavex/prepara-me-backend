import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { SimulatorVideosGroupActiveEnum } from "@modules/products/enums/SimulatorVideosGroupActiveEnum";
import { SimulatorVideosGroup } from "@modules/products/infra/typeorm/entities/SimulatorVideosGroup";

interface IRequestFind {
    name?: string;
    active?: SimulatorVideosGroupActiveEnum;
    id?: string;
}

interface ISimulatorVideosGroupsRepository {
    create(data: ICreateSimulatorVideosGroupDTO): Promise<SimulatorVideosGroup>;
    find(data: IRequestFind): Promise<SimulatorVideosGroup[]>;
    remove(id: string): Promise<void>;
}

export { ISimulatorVideosGroupsRepository };

