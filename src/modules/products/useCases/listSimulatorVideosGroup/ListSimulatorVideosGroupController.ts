import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSimulatorVideosGroupUseCase } from "./ListSimulatorVideosGroupUseCase";

class ListSimulatorVideosGroupController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { name, active } = request.query;

        const listSimulatorVideosGroupUseCase = container.resolve(
            ListSimulatorVideosGroupUseCase
        );

        const listSimulatorVideosGroups = await listSimulatorVideosGroupUseCase.execute({
            id,
            name,
            active,
        });

        return response.status(200).send(listSimulatorVideosGroups);
    }
}

export { ListSimulatorVideosGroupController };

