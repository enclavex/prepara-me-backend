import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO";
import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum";
import { SpecialistSchedule } from "@modules/specialists/infra/typeorm/entities/SpecialistSchedule";
import { ISpecialistSchedulesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSpecialistScheduleUseCase {
    constructor(
        @inject("SpecialistSchedulesRepository")
        private specialistSchedulesRepository: ISpecialistSchedulesRepository,
    ) { }

    async execute({
        dateSchedule,
        specialistId,
        status
    }: ICreateSpecialistScheduleDTO): Promise<SpecialistSchedule> {
        dateSchedule    = new Date(dateSchedule)
        
        if (!dateSchedule) {
            throw new AppError("Date Schedule can't be null!")
        }

        if (!specialistId) {
            throw new AppError("Specialist can't be null!")
        }

        if (!Object.values(SpecialistScheduleStatusEnum).includes(status)) {
            throw new AppError("Status entered wrong");
        }

        const specialistSchedule = await this.specialistSchedulesRepository.create({
            dateSchedule,
            specialistId,
            status
        })

        return specialistSchedule
    }
}

export { CreateSpecialistScheduleUseCase }