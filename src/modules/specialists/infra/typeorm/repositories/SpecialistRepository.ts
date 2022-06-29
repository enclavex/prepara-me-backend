import { ICreateSpecialistDTO } from "@modules/specialists/dtos/ICreateSpecialistDTO";
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { getRepository, Repository } from "typeorm";
import { Specialist } from "../entities/Specialist";

class SpecialistRepository implements ISpecialistsRepository {
    private repository: Repository<Specialist>

    constructor() {
        this.repository = getRepository(Specialist)
    }

    async create({
        name,
        bio,
        status,
        linkedinUrl,
        userId,
        id
    }: ICreateSpecialistDTO): Promise<Specialist> {
        const specialist = this.repository.create({
            name,
            bio,
            status,
            linkedinUrl,
            userId,
            id
        })

        await this.repository.save(specialist);

        return specialist
    }

    async findById(id: string): Promise<Specialist> {
        const specialist = await this.repository.findOne(id)

        return specialist
    }

    async findByIds(
        ids: string[],
        dateBegin: Date,
        dateEnd: Date
    ): Promise<Specialist[]> {
        const specialistsQuery = this.repository
            .createQueryBuilder("s")

        if (dateBegin && dateEnd) {
            specialistsQuery.leftJoinAndSelect(
                "s.specialistScheduleAvailable",
                "ssa",
                "ssa.dateSchedule between :dateBegin and :dateEnd",
                {
                    dateBegin,
                    dateEnd
                })
        }

        specialistsQuery.andWhere('s.id IN (:...ids)')
            .setParameter('ids', [...ids])
            .andWhere("s.status = :status", { status: SpecialistStatusEnum.ACTIVE })

        const specialists = await specialistsQuery.getMany();

        return specialists
    }

    async findAvailable(): Promise<Specialist[]> {
        const specialistsQuery = this.repository
            .createQueryBuilder("e")
            .leftJoinAndSelect("e.specialistScheduleAvailable", "specialistScheduleAvailable")
            .where("e.status = :status", { status: SpecialistStatusEnum.ACTIVE })

        const specialists = await specialistsQuery.getMany();

        return specialists
    }

}

export { SpecialistRepository }