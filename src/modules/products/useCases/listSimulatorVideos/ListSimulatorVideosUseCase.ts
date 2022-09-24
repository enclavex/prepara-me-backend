import { ISimulatorVideosRepository } from "@modules/products/repositories/ISimulatorVideosRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSimulatorVideosUseCase {
    constructor(
        @inject("SimulatorVideosRepository")
        private simulatorVideosRepository: ISimulatorVideosRepository
    ) {}

    async execute({ id, simulatorVideosGroupId }) {
        const simulatorVideos = this.simulatorVideosRepository.find({
            id,
            simulatorVideosGroupId,
        });

        return simulatorVideos;
    }
}

export { ListSimulatorVideosUseCase };

