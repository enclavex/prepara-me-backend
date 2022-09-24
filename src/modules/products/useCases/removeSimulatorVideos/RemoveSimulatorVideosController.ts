import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveSimulatorVideosUseCase } from "./RemoveSimulatorVideosUseCase";

class RemoveSimulatorVideosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeSimulatorVideosUseCase = container.resolve(
            RemoveSimulatorVideosUseCase
        );

        await removeSimulatorVideosUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveSimulatorVideosController };

