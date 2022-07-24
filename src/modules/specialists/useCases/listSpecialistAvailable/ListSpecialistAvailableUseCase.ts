import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecialistAvailableUseCase {
    constructor(
        @inject("SpecialistsRepository")
        private specialistsRepository: ISpecialistsRepository
    ) {}

    async execute() {
        const specialists = await this.specialistsRepository.find({
            status: SpecialistStatusEnum.ACTIVE,
        });

        return specialists;
    }
}

export { ListSpecialistAvailableUseCase };
