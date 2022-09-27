import { ICreateSimulatorVideosDTO } from "@modules/products/dtos/ICreateSimulatorVideosDTO";
import { SimulatorVideos } from "@modules/products/infra/typeorm/entities/SimulatorVideos";
import { IResponseSimulatorVideoDTO } from "../dtos/IResponseSimulatorVideoDTO";

interface IRequestFind {
    simulatorVideosGroupId?:string;
    id?: string;
}

interface ISimulatorVideosRepository {
    create(data: ICreateSimulatorVideosDTO): Promise<SimulatorVideos>;
    find(data: IRequestFind): Promise<IResponseSimulatorVideoDTO[]>;
    remove(id: string): Promise<void>;
}

export { ISimulatorVideosRepository };

