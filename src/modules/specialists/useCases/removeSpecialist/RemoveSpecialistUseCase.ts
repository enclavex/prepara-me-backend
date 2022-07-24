import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveSpecialistUseCase {
    constructor(
        @inject("SpecialistsRepository")
        private specialistsRepository: ISpecialistsRepository
    ) {}

    async execute(id) {
        await this.specialistsRepository.remove(id);
    }
}

export { RemoveSpecialistUseCase };

