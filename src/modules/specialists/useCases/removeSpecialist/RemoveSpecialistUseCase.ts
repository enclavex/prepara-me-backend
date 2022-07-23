import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveSpecialistUseCase {
    constructor(
        @inject("SpecialistRepository")
        private specialistRepository: ISpecialistsRepository
    ) {}

    async execute(id) {
        await this.specialistRepository.remove(id);
    }
}

export { RemoveSpecialistUseCase };

