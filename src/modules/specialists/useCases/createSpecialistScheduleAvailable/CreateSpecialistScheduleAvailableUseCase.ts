import { ICreateSpecialistScheduleAvailableDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleAvailableDTO";
import { SpecialistScheduleAvailableStatusEnum } from "@modules/specialists/enums/SpecialistScheduleAvailableStatusEnum";
import { SpecialistScheduleAvailable } from "@modules/specialists/infra/typeorm/entities/SpecialistScheduleAvailable";
import { ISpecialistSchedulesAvailablesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesAvailablesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSpecialistScheduleAvailableUseCase {
    constructor(
        @inject("SpecialistScheduleAvailableRepository")
        private specialistScheduleAvailableRepository: ISpecialistSchedulesAvailablesRepository
    ) { }

    async execute({
        dateSchedule,
        specialistId,
        status
    }: ICreateSpecialistScheduleAvailableDTO): Promise<SpecialistScheduleAvailable> {
        if (!dateSchedule) {
            throw new AppError("Date Schedule can't be null!")
        }

        if (!specialistId) {
            throw new AppError("Specialist can't be null!")
        }

        if (!Object.values(SpecialistScheduleAvailableStatusEnum).includes(status)) {
            throw new AppError("Status entered wrong");
        }

        const specialistScheduleAvailable = await this.specialistScheduleAvailableRepository.create({
            dateSchedule,
            specialistId,
            status
        })

        return specialistScheduleAvailable
    }
}

export { CreateSpecialistScheduleAvailableUseCase }