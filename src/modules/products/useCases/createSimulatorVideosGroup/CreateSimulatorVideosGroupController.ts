import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSimulatorVideosGroupUseCase } from "./CreateSimulatorVideosGroupUseCase";

class CreateSimulatorVideosGroupController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, active, id, order } = request.body;

        const createSimulatorVideosGroupUseCase = container.resolve(
            CreateSimulatorVideosGroupUseCase
        );

        const simulatorVideos = await createSimulatorVideosGroupUseCase.execute(
            {
                name,
                active,
                id,
                order,
            }
        );

        return response.status(201).send(simulatorVideos);
    }
}

export { CreateSimulatorVideosGroupController };

