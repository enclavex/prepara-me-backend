import { ICreateSimulatorVideosDTO } from "@modules/products/dtos/ICreateSimulatorVideosDTO";
import { IResponseSimulatorVideoDTO } from "@modules/products/dtos/IResponseSimulatorVideoDTO";
import { SimulatorVideos } from "@modules/products/infra/typeorm/entities/SimulatorVideos";
import { SimulatorVideoMap } from "@modules/products/mapper/SimulatorVideoMap";
import { ISimulatorVideosRepository } from "../ISimulatorVideosRepository";

class SimulatorVideosRepositoryInMemory implements ISimulatorVideosRepository {
    simulatorVideos: SimulatorVideos[] = [];

    async create({
        id,
        linkVideo,
        question,
        simulatorVideosGroupId,
        tip,
        answerStrategy,
        avoid,
        necessariesSkills,
        objective,
    }: ICreateSimulatorVideosDTO): Promise<SimulatorVideos> {
        const simulatorVideos = new SimulatorVideos(
            question,
            linkVideo,
            tip,
            answerStrategy,
            avoid,
            objective,
            necessariesSkills,
            id,
            simulatorVideosGroupId
        );

        this.simulatorVideos.push(simulatorVideos);

        return simulatorVideos;
    }

    async find({
        id,
        simulatorVideosGroupId,
    }): Promise<IResponseSimulatorVideoDTO[]> {
        let simulatorVideos = this.simulatorVideos;

        if (id) {
            simulatorVideos = simulatorVideos.filter((simulatorVideos) => {
                return simulatorVideos.id === id;
            });
        } else {
            if (simulatorVideosGroupId) {
                simulatorVideos = simulatorVideos.filter((simulatorVideos) => {
                    return (
                        simulatorVideos.simulatorVideosGroupId ===
                        simulatorVideosGroupId
                    );
                });
            }
        }

        const simulatorVideosMapped = simulatorVideos.map((simulatorVideo) => {
            return SimulatorVideoMap.toDTO(simulatorVideo);
        });

        return simulatorVideosMapped;
    }

    async remove(id: string): Promise<void> {
        this.simulatorVideos = this.simulatorVideos.filter(
            (simulatorVideos) => {
                return id !== simulatorVideos.id;
            }
        );
    }
}

export { SimulatorVideosRepositoryInMemory };

