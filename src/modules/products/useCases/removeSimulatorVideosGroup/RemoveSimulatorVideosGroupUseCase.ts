import { ISimulatorVideosGroupsRepository } from "@modules/products/repositories/ISimulatorVideosGroupsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveSimulatorVideosGroupUseCase {
    constructor(
        @inject("SimulatorVideosGroupsRepository")
        private simulatorVideosGroupsRepository: ISimulatorVideosGroupsRepository
    ) {}

    async execute(id) {
        return await this.simulatorVideosGroupsRepository.remove(id);
    }
}

export { RemoveSimulatorVideosGroupUseCase };

