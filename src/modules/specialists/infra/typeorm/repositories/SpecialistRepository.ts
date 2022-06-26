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

    async findAvailable(): Promise<Specialist[]> {
        const specialistsQuery = this.repository
            .createQueryBuilder("e")
            .where("e.status = :status", { status: SpecialistStatusEnum.ACTIVE })

        const specialists = await specialistsQuery.getMany();

        return specialists
    }

}

export { SpecialistRepository }