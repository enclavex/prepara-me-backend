import { ISpecialistResponseDTO } from "@modules/specialists/dtos/ISpecialistResponseDTO";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecialistUseCase {
    constructor(
        @inject("SpecialistsRepository")
        private specialistsRepository: ISpecialistsRepository
    ) {}

    async execute({ status, name, userId, id }): Promise<ISpecialistResponseDTO[]> {
        const specialists = await this.specialistsRepository.find({
            status,
            name,
            userId,
            id
        });

        return specialists;
    }
}

export { ListSpecialistUseCase };

