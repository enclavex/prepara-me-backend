import { ICreateSpecialistScheduleAvailableDTO } from "../dtos/ICreateSpecialistScheduleAvailableDTO"
import { SpecialistScheduleAvailable } from "../infra/typeorm/entities/SpecialistScheduleAvailable"

interface ISpecialistScheduleAvailableRepository {
    create(data: ICreateSpecialistScheduleAvailableDTO): Promise<SpecialistScheduleAvailable>
    findById(id: string): Promise<SpecialistScheduleAvailable>
    findBySpecialistIdAndDate(specialistId: string, dateBegin: Date, dateEnd: Date): Promise<SpecialistScheduleAvailable[]>
}

export { ISpecialistScheduleAvailableRepository }