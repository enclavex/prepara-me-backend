import { ISimulatorVideosGroupsRepository } from "@modules/products/repositories/ISimulatorVideosGroupsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSimulatorVideosGroupUseCase {
    constructor(
        @inject("SimulatorVideosGroupsRepository")
        private simulatorVideosGroupsRepository: ISimulatorVideosGroupsRepository
    ) {}

    async execute({ id, name, active }) {
        const simulatorVideos = this.simulatorVideosGroupsRepository.find({
            id,
            active,
            name,
        });

        return simulatorVideos;
    }
}

export { ListSimulatorVideosGroupUseCase };

