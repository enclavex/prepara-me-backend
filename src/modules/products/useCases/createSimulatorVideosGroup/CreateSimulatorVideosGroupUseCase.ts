import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { SimulatorVideosGroup } from "@modules/products/infra/typeorm/entities/SimulatorVideosGroup";
import { ISimulatorVideosGroupsRepository } from "@modules/products/repositories/ISimulatorVideosGroupsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSimulatorVideosGroupUseCase {
    constructor(
        @inject("SimulatorVideosGroupsRepository")
        private simulatorVideosGroupsRepository: ISimulatorVideosGroupsRepository
    ) {}

    async execute({
        name,
        active,
        id,
    }: ICreateSimulatorVideosGroupDTO): Promise<SimulatorVideosGroup> {
        if (!name) {
            throw new AppError("Name can't be null");
        }

        const simulatorVideo = await this.simulatorVideosGroupsRepository.create({
            name,
            active,
            id,
        });

        return simulatorVideo;
    }
}

export { CreateSimulatorVideosGroupUseCase };

