import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO";
import { ISpecialistSchedulesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesRepository";
import { getRepository, Repository } from "typeorm";
import { SpecialistSchedule } from "../entities/SpecialistSchedule";

class SpecialistSchedulesRepository implements ISpecialistSchedulesRepository {
    private repository: Repository<SpecialistSchedule>;

    constructor() {
        this.repository = getRepository(SpecialistSchedule);
    }

    async create({
        dateSchedule,
        specialistId,
        status,
        userId,
        id,
    }: ICreateSpecialistScheduleDTO): Promise<SpecialistSchedule> {
        const specialistSchedule = this.repository.create({
            dateSchedule,
            specialistId,
            status,
            id,
        });

        if (userId) {
            Object.assign(specialistSchedule, { userId });
        }

        await this.repository.save(specialistSchedule);

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
    }): Promise<SpecialistSchedule[]> {
        const specialistSchedulesQuery = this.repository
            .createQueryBuilder("ss")
            .leftJoinAndSelect("ss.user", "u")
            .leftJoinAndSelect("ss.specialist", "s")
            .leftJoinAndSelect("ss.product", "p");

        if (id) {
            specialistSchedulesQuery.andWhere("ss.id = :id", {
                id: id,
            });
        } else {
            if (status) {
                specialistSchedulesQuery.andWhere("ss.status = :status", {
                    status: status,
                });
            }

            if (userId) {
                specialistSchedulesQuery.andWhere("ss.userId = :userId", {
                    userId: userId,
                });
            }

            if (specialistId) {
                specialistSchedulesQuery.andWhere(
                    "ss.specialistId = :specialistId",
                    {
                        specialistId: specialistId,
                    }
                );
            }

            if (productId) {
                specialistSchedulesQuery.andWhere("ss.productId = :productId", {
                    productId: productId,
                });
            }

            if (dateBegin && dateEnd) {
                specialistSchedulesQuery.andWhere(
                    "ss.dateSchedule between :dateBegin and :dateEnd",
                    {
                        dateBegin: dateBegin,
                        dateEnd: dateEnd,
                    }
                );
            }
        }

        const specialistSchedules = await specialistSchedulesQuery.getMany();

        return specialistSchedules;
    }

    async remove(id: string): Promise<string> {
        this.repository.delete(id);

        return id;
    }
}

export { SpecialistSchedulesRepository };

