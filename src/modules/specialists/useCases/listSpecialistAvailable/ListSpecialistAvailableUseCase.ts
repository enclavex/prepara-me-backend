import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecialistAvailableUseCase {
    constructor(
        @inject("SpecialistRepository")
        private specialistRepository: ISpecialistsRepository
    ) { }

    async execute() {
        const specialists = await this.specialistRepository.findAvailable()

        return specialists
    }
}

export { ListSpecialistAvailableUseCase }