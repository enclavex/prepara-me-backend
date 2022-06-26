import { ICreateSpecialistDTO } from "@modules/specialists/dtos/ICreateSpecialistDTO";
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { Specialist } from "../../entities/Specialist";

class SpecialistRepositoryInMemory implements ISpecialistsRepository {
    specialists: Specialist[] = []

    async create({
        name,
        bio,
        status,
        linkedinUrl,
        userId,
    }: ICreateSpecialistDTO): Promise<Specialist> {
        const specialist = new Specialist(
            name,
            bio,
            status,
            linkedinUrl,
            userId
        )

        this.specialists.push(specialist)

        return specialist
    }

    async findById(id: string): Promise<Specialist> {
        return this.specialists.find((specialist) => specialist.id === id);
    }

    async findAvailable(): Promise<Specialist[]> {
        return this.specialists.filter((specialist) => {
            return (
                specialist.status === SpecialistStatusEnum.ACTIVE
            );
        });
    }

}

export { SpecialistRepositoryInMemory }