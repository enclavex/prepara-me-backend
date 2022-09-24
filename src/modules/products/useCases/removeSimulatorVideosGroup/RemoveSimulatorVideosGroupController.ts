import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveSimulatorVideosGroupUseCase } from "./RemoveSimulatorVideosGroupUseCase";

class RemoveSimulatorVideosGroupController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeSimulatorVideosGroupUseCase = container.resolve(
            RemoveSimulatorVideosGroupUseCase
        );

        await removeSimulatorVideosGroupUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveSimulatorVideosGroupController };

