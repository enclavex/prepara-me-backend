import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum";
import { ISpecialistSchedulesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateSpecialistScheduleUseCase {
    constructor(
        @inject("SpecialistSchedulesRepository")
        private specialistSchedulesRepository: ISpecialistSchedulesRepository
    ) {}

    async execute({
        specialistScheduleId,
        userId
    }) {
        const specialistSchedule = await this.specialistSchedulesRepository.find(specialistScheduleId)

        if (specialistSchedule[0].status === SpecialistScheduleStatusEnum.UNAVAILABLE) {
            throw new AppError("Schedule unavailable!")
        }

        specialistSchedule[0].status = SpecialistScheduleStatusEnum.UNAVAILABLE
        specialistSchedule[0].userId = userId

        const specialistScheduleUpdated = await this.specialistSchedulesRepository.create(specialistSchedule[0])

        return specialistScheduleUpdated
    }
}

export {UpdateSpecialistScheduleUseCase}