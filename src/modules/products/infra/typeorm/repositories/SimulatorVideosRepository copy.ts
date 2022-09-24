import { ICreateSimulatorVideosDTO } from "@modules/products/dtos/ICreateSimulatorVideosDTO";
import { ISimulatorVideosRepository } from "@modules/products/repositories/ISimulatorVideosRepository";
import { getRepository, Repository } from "typeorm";
import { SimulatorVideos } from "../entities/SimulatorVideos";

class SimulatorVideosRepository implements ISimulatorVideosRepository {
    private repository: Repository<SimulatorVideos>;

    constructor() {
        this.repository = getRepository(SimulatorVideos);
    }

    async create({
        question,
        linkVideo,
        tip,
        id,
        answerStrategy,
        avoid,
        necessariesSkills,
        objective,
        simulatorVideosGroupId,
    }: ICreateSimulatorVideosDTO): Promise<SimulatorVideos> {
        const simulatorVideos = this.repository.create({
            question,
            linkVideo,
            tip,
            answerStrategy,
            avoid,
            necessariesSkills,
            objective,
            simulatorVideosGroupId,
            id,
        });

        await this.repository.save(simulatorVideos);

        return simulatorVideos;
    }

    async find({ id, simulatorVideosGroupId }): Promise<SimulatorVideos[]> {
        const simulatorVideosQuery = this.repository.createQueryBuilder("sv");

        if (id) {
            simulatorVideosQuery.andWhere("sv.id = :id", {
                id: id,
            });
        } else {
            if (simulatorVideosGroupId) {
                simulatorVideosQuery.andWhere(
                    "sv.simulatorVideosGroupId = :simulatorVideosGroupId",
                    {
                        simulatorVideosGroupId: simulatorVideosGroupId,
                    }
                );
            }
        }

        const simulatorVideos = await simulatorVideosQuery.getMany();

        return simulatorVideos;
    }

    async remove(id: string): Promise<void> {
        this.repository.delete(id);
    }
}

export { SimulatorVideosRepository };

