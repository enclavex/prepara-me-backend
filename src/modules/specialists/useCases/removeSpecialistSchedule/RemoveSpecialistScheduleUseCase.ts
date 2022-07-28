import { ISpecialistSchedulesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveSpecialistScheduleUseCase {
    constructor(
        @inject("SpecialistSchedulesRepository")
        private specialistSchedulesRepository: ISpecialistSchedulesRepository
    ) {}

    async execute(id) {
        return await this.specialistSchedulesRepository.remove(id);
    }
}

export { RemoveSpecialistScheduleUseCase };

