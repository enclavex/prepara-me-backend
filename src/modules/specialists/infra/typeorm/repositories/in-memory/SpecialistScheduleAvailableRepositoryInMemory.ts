import { ICreateSpecialistScheduleAvailableDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleAvailableDTO";
import { ISpecialistSchedulesAvailablesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesAvailablesRepository";
import { SpecialistScheduleAvailable } from "../../entities/SpecialistScheduleAvailable";

class SpecialistScheduleAvailableRepositoryInMemory implements ISpecialistSchedulesAvailablesRepository {
    specialistScheduleAvailables: SpecialistScheduleAvailable[] = []

    async create({
        dateSchedule,
        specialistId,
        status,
        userId
    }: ICreateSpecialistScheduleAvailableDTO): Promise<SpecialistScheduleAvailable> {
        const specialistScheduleAvailable = new SpecialistScheduleAvailable(
            dateSchedule,
            specialistId,
            status
        )

        if (userId) {
            Object.assign(specialistScheduleAvailable, { userId })
        }

        this.specialistScheduleAvailables.push(specialistScheduleAvailable)

        return specialistScheduleAvailable
    }

    async findById(id: string): Promise<SpecialistScheduleAvailable> {
        const specialistScheduleAvailable = this.specialistScheduleAvailables.find((specialistScheduleAvailable) => {
            return specialistScheduleAvailable.id === id
        })

        return specialistScheduleAvailable
    }

    async findBySpecialistIdAndDate(specialistId: string, dateBegin: Date, dateEnd: Date): Promise<SpecialistScheduleAvailable[]> {
        const specialistScheduleAvailable = this.specialistScheduleAvailables.filter((specialistScheduleAvailable) => {
            return specialistScheduleAvailable.specialistId === specialistId && 
                specialistScheduleAvailable.dateSchedule >= dateBegin && 
                specialistScheduleAvailable.dateSchedule <= dateEnd
        })

        return specialistScheduleAvailable
    }
}

export { SpecialistScheduleAvailableRepositoryInMemory }