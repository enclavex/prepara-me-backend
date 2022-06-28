import { SpecialistScheduleAvailableStatusEnum } from "@modules/specialists/enums/SpecialistScheduleAvailableStatusEnum";
import { ISpecialistScheduleAvailableRepository } from "@modules/specialists/repositories/ISpecialistScheduleAvailableRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateSpecialistScheduleAvailableUseCase {
    constructor(
        @inject("SpecialistScheduleAvailableRepository")
        private specialistScheduleAvailableRepository: ISpecialistScheduleAvailableRepository 
    ) {}

    async execute({
        specialistScheduleAvailableId,
        userId
    }) {
        const specialistScheduleAvailable = await this.specialistScheduleAvailableRepository.findById(specialistScheduleAvailableId)

        if (specialistScheduleAvailable.status === SpecialistScheduleAvailableStatusEnum.UNAVAILABLE) {
            throw new AppError("Schedule unavailable!")
        }

        specialistScheduleAvailable.status = SpecialistScheduleAvailableStatusEnum.UNAVAILABLE
        specialistScheduleAvailable.userId = userId

        const specialistScheduleAvailableUpdated = await this.specialistScheduleAvailableRepository.create(specialistScheduleAvailable)

        return specialistScheduleAvailableUpdated
    }
}

export {UpdateSpecialistScheduleAvailableUseCase}