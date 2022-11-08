import { IResponseSimulatorVideosGroupDTO } from "./IResponseSimulatorVideosGroupDTO";

interface IResponseSimulatorVideoDTO {
    id: string;
    answerStrategy: string;
    avoid: string;
    linkVideo: string;
    necessariesSkills: string;
    objective: string;
    question: string;
    simulatorVideosGroup: IResponseSimulatorVideosGroupDTO;
    tip: string;
    order: number;
}

export { IResponseSimulatorVideoDTO };

