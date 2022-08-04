import { ISpecialistSchedulesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecialistScheduleUseCase {
    constructor(
        @inject("SpecialistSchedulesRepository")
        private specialistSchedulesRepository: ISpecialistSchedulesRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({
        dateBegin,
        dateEnd,
        userId,
        status,
        productId,
        specialistId,
        specialistUserId,
        id,
    }) {
        if (dateBegin) {
            dateBegin = this.dateProvider.getDate(dateBegin);
            dateBegin.setHours(0, 0, 0);
            dateBegin = this.dateProvider.getDateTimeZone(dateBegin);
        }

        if (dateEnd) {
            dateEnd = this.dateProvider.getDate(dateEnd);
            dateEnd.setHours(23, 59, 59);
            dateEnd = this.dateProvider.getDateTimeZone(dateEnd);
        }

        const specialistSchedules =
            await this.specialistSchedulesRepository.find({
                dateBegin,
                dateEnd,
                userId,
                status,
                productId,
                specialistId,
                specialistUserId,
                id,
            });

        return specialistSchedules;
    }
}

export { ListSpecialistScheduleUseCase };

