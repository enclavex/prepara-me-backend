import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO";
import { ISpecialistScheduleResponseDTO } from "@modules/specialists/dtos/ISpecialistScheduleResponseDTO";
import { SpecialistSchedule } from "@modules/specialists/infra/typeorm/entities/SpecialistSchedule";
import { ISpecialistSchedulesRepository } from "../ISpecialistSchedulesRepository";

class SpecialistScheduleRepositoryInMemory
    implements ISpecialistSchedulesRepository
{
    specialistSchedules: SpecialistSchedule[] = [];

    async create({
        dateSchedule,
        specialistId,
        status,
        userId,
        productId,
        comments,
        hangoutLink,
        scheduleEventId,
        id,
    }: ICreateSpecialistScheduleDTO): Promise<SpecialistSchedule> {
        const specialistSchedule = new SpecialistSchedule(
            dateSchedule,
            specialistId,
            userId,
            productId,
            status,
            comments,
            hangoutLink,
            scheduleEventId,
            id
        );

        this.specialistSchedules.push(specialistSchedule);

        return specialistSchedule;
    }

    async find({
        dateBegin,
        dateEnd,
        userId,
        status,
        productId,
        specialistId,
        id,
    }): Promise<ISpecialistScheduleResponseDTO[]> {
        let specialistSchedules = this.specialistSchedules;

        if (id) {
            specialistSchedules = specialistSchedules.filter(
                (specialistSchedule) => {
                    return specialistSchedule.id === id;
                }
            );
        } else {
            if (status) {
                specialistSchedules = specialistSchedules.filter(
                    (specialistSchedule) => {
                        return specialistSchedule.status === status;
                    }
                );
            }

            if (userId) {
                specialistSchedules = specialistSchedules.filter(
                    (specialistSchedule) => {
                        return specialistSchedule.userId === userId;
                    }
                );
            }

            if (specialistId) {
                specialistSchedules = specialistSchedules.filter(
                    (specialistSchedule) => {
                        return specialistSchedule.specialistId === specialistId;
                    }
                );
            }

            if (productId) {
                specialistSchedules = specialistSchedules.filter(
                    (specialistSchedule) => {
                        return specialistSchedule.productId === productId;
                    }
                );
            }

            if (dateBegin && dateEnd) {
                specialistSchedules = specialistSchedules.filter(
                    (specialistSchedule) => {
                        return (
                            specialistSchedule.dateSchedule >= dateBegin &&
                            specialistSchedule.dateSchedule <= dateEnd
                        );
                    }
                );
            }
        }

        return specialistSchedules;
    }

    async remove(id: string): Promise<string> {
        this.specialistSchedules = this.specialistSchedules.filter(
            (specialistSchedule) => {
                return id !== specialistSchedule.id;
            }
        );

        return id;
    }
}

export { SpecialistScheduleRepositoryInMemory };

