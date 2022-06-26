import { ICreateSpecialistDTO } from "@modules/specialists/dtos/ICreateSpecialistDTO";
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum";
import { Specialist } from "@modules/specialists/infra/typeorm/entities/Specialist";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSpecialistUseCase {
    constructor(
        @inject("SpecialistRepository")
        private specialistRepository: ISpecialistsRepository
    ) { }

    async execute({
        name,
        bio,
        status,
        linkedinUrl,
        userId
    }: ICreateSpecialistDTO): Promise<Specialist> {
        if (!name) {
            throw new AppError("Name can't be null");
        }

        if (!bio) {
            throw new AppError("Bio can't be null");
        }

        if (!Object.values(SpecialistStatusEnum).includes(status)) {
            throw new AppError("Status entered wrong");
        }

        if (!userId) {
            throw new AppError("User can't be null");
        }

        const specialist = await this.specialistRepository.create({
            name,
            bio,
            status,
            userId,
            linkedinUrl
        })

        return specialist
    }
}

export { CreateSpecialistUseCase }