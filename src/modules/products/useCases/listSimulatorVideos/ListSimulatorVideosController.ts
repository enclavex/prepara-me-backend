import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSimulatorVideosUseCase } from "./ListSimulatorVideosUseCase";

class ListSimulatorVideosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { simulatorVideosGroupId } = request.query;

        const listSimulatorVideosUseCase = container.resolve(
            ListSimulatorVideosUseCase
        );

        const listSimulatorVideos = await listSimulatorVideosUseCase.execute({
            id,
            simulatorVideosGroupId,
        });

        return response.status(200).send(listSimulatorVideos);
    }
}

export { ListSimulatorVideosController };

