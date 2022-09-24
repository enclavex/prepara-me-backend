import { SimulatorVideosGroupActiveEnum } from "../enums/SimulatorVideosGroupActiveEnum";

interface ICreateSimulatorVideosGroupDTO {
    name: string;
    active: SimulatorVideosGroupActiveEnum;
    id?: string;
}

export { ICreateSimulatorVideosGroupDTO };
