import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSimulatorVideosUseCase } from "./CreateSimulatorVideosUseCase";

class CreateSimulatorVideosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            id,
            linkVideo,
            question,
            simulatorVideosGroupId,
            tip,
            answerStrategy,
            avoid,
            necessariesSkills,
            objective,
        } = request.body;

        const createSimulatorVideosUseCase = container.resolve(
            CreateSimulatorVideosUseCase
        );

        const simulatorVideos = await createSimulatorVideosUseCase.execute({
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

        return response.status(201).send(simulatorVideos);
    }
}

export { CreateSimulatorVideosController };

