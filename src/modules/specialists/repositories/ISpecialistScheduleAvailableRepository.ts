import { ICreateSpecialistScheduleAvailableDTO } from "../dtos/ICreateSpecialistScheduleAvailableDTO"
import { SpecialistScheduleAvailable } from "../infra/typeorm/entities/SpecialistScheduleAvailable"

interface ISpecialistScheduleAvailableRepository {
    create(data: ICreateSpecialistScheduleAvailableDTO): Promise<SpecialistScheduleAvailable>
}

export { ISpecialistScheduleAvailableRepository }