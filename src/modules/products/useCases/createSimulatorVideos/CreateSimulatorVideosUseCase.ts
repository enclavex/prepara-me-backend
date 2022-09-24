import { ICreateSimulatorVideosDTO } from "@modules/products/dtos/ICreateSimulatorVideosDTO";
import { SimulatorVideos } from "@modules/products/infra/typeorm/entities/SimulatorVideos";
import { ISimulatorVideosRepository } from "@modules/products/repositories/ISimulatorVideosRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSimulatorVideosUseCase {
    constructor(
        @inject("SimulatorVideosRepository")
        private simulatorVideosRepository: ISimulatorVideosRepository
    ) {}

    async execute({
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
        if (!question) {
            throw new AppError("Question can't be null");
        }

        const simulatorVideo = await this.simulatorVideosRepository.create({
            id,
            linkVideo,
            question,
            simulatorVideosGroupId,
            tip,
            answerStrategy,
            avoid,
            necessariesSkills,
            objective,
        });

        return simulatorVideo;
    }
}

export { CreateSimulatorVideosUseCase };

