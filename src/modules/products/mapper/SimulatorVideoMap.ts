import { instanceToInstance } from "class-transformer";
import { IResponseSimulatorVideoDTO } from "../dtos/IResponseSimulatorVideoDTO";
import { SimulatorVideos } from "../infra/typeorm/entities/SimulatorVideos";
import { SimulatorVideosGroupMap } from "./SimulatorVideosGroupMap";

class SimulatorVideoMap {
    static toDTO({
        id,
        answerStrategy,
        avoid,
        linkVideo,
        necessariesSkills,
        objective,
        question,
        simulatorVideosGroup,
        tip
    }: SimulatorVideos): IResponseSimulatorVideoDTO {
        const simulatorVideosMapped = instanceToInstance({
            id,
            answerStrategy,
            avoid,
            linkVideo,
            necessariesSkills,
            objective,
            question,
            tip,
            simulatorVideosGroup: simulatorVideosGroup ? process.env.NODE_ENV === "test" ? simulatorVideosGroup : SimulatorVideosGroupMap.toDTO(simulatorVideosGroup) : null,
        });

        return simulatorVideosMapped;
    }
}

export { SimulatorVideoMap };

