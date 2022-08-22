import { ICreateRequestScheduleDTO } from "@modules/products/dtos/ICreateRequestScheduleDTO";
import { RequestSchedule } from "@modules/products/infra/typeorm/entities/RequestSchedule";
import { IRequestScheduleRepository } from "@modules/products/repositories/IRequestScheduleRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateRequestScheduleUseCase {
    constructor(
        @inject("RequestScheduleRepository")
        private requestScheduleRepository: IRequestScheduleRepository
    ) {}

    async execute({
        email,
        name,
        obs,
        id,
    }: ICreateRequestScheduleDTO): Promise<RequestSchedule> {
        if (!email) {
            throw new AppError("Email can't be null");
        }

        if (!name) {
            throw new AppError("Name can't be null");
        }

        const requestSchedule = await this.requestScheduleRepository.create({
            email,
            name,
            obs,
            id,
        });

        return requestSchedule;
    }
}

export { CreateRequestScheduleUseCase };
