import { ISpecialistResponseDTO } from "@modules/specialists/dtos/ISpecialistResponseDTO";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecialistUseCase {
    constructor(
        @inject("SpecialistRepository")
        private specialistRepository: ISpecialistsRepository
    ) {}

    async execute({ status, name, userId, id }): Promise<ISpecialistResponseDTO[]> {
        const specialists = await this.specialistRepository.find({
            status,
            name,
            userId,
            id
        });

        return specialists;
    }
}

export { ListSpecialistUseCase };

