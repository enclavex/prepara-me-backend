import { ISpecialistScheduleAvailableRepository } from "@modules/specialists/repositories/ISpecialistScheduleAvailableRepository";
import { inject, injectable } from "tsyringe";
import { textChangeRangeIsUnchanged } from "typescript";

interface IRequest {
    specialistId: string,
    dateBegin: Date,
    dateEnd: Date
}

@injectable()
class ListScheduleSpecialistByDateUseCase {
    constructor(
        @inject("SpecialistScheduleAvailableRepository")
        private specialistScheduleAvailableRepository: ISpecialistScheduleAvailableRepository
    ) { }

    async execute({
        specialistId,
        dateBegin,
        dateEnd
    }: IRequest) {
        dateBegin = new Date(dateBegin)
        dateEnd = new Date(dateEnd)

        dateBegin.setHours(0, 0, 0)
        dateEnd.setHours(23, 59, 59)

        const specialistScheduleAvailables = await this.specialistScheduleAvailableRepository.findBySpecialistIdAndDate(
            specialistId,
            dateBegin,
            dateEnd
        )

        return specialistScheduleAvailables
    }
}

export { ListScheduleSpecialistByDateUseCase }