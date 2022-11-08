import { SimulatorVideosGroupActiveEnum } from "../enums/SimulatorVideosGroupActiveEnum";

interface ICreateSimulatorVideosGroupDTO {
    name: string;
    order: number;
    active: SimulatorVideosGroupActiveEnum;
    id?: string;
}

export { ICreateSimulatorVideosGroupDTO };
