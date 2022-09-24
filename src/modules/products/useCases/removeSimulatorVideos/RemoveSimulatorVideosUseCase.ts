import { ISimulatorVideosRepository } from "@modules/products/repositories/ISimulatorVideosRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveSimulatorVideosUseCase {
    constructor(
        @inject("SimulatorVideosRepository")
        private simulatorVideosRepository: ISimulatorVideosRepository
    ) {}

    async execute(id) {
        return await this.simulatorVideosRepository.remove(id);
    }
}

export { RemoveSimulatorVideosUseCase };

