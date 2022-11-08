import { ICreateSimulatorVideosDTO } from "@modules/products/dtos/ICreateSimulatorVideosDTO";
import { IResponseSimulatorVideoDTO } from "@modules/products/dtos/IResponseSimulatorVideoDTO";
import { SimulatorVideoMap } from "@modules/products/mapper/SimulatorVideoMap";
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
        order
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
            order
        });

        await this.repository.save(simulatorVideos);

        return simulatorVideos;
    }

    async find({
        id,
        simulatorVideosGroupId,
    }): Promise<IResponseSimulatorVideoDTO[]> {
        const simulatorVideosQuery = this.repository.createQueryBuilder("sv")
        .innerJoinAndSelect('sv.simulatorVideosGroup', 'svg')

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

        simulatorVideosQuery.orderBy("sv.order", "ASC");

        const simulatorVideos = await simulatorVideosQuery.getMany();

        const simulatorVideosMapped = simulatorVideos.map((simulatorVideo) => {
            return SimulatorVideoMap.toDTO(simulatorVideo);
        });

        return simulatorVideosMapped;
    }

    async remove(id: string): Promise<void> {
        this.repository.delete(id);
    }
}

export { SimulatorVideosRepository };

