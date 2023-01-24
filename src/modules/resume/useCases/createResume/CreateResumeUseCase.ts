import { inject, injectable } from "tsyringe";
import { ICreateResumeDTO } from "../../dtos/ICreateResumeDTO";
import { Resume } from "../../infra/typeorm/entities/Resume";
import { IResumeRepository } from "../../repositories/IResumeRepository";

@injectable()
class CreateResumeUseCase {
    constructor(
        @inject("ResumeRepository")
        private resumeRepository: IResumeRepository
    ) {}

    async execute({
        city,
        email,
        extraInfo,
        linkedinURL,
        name,
        objectives,
        phone,
        portfolioURL,
        professionalResume,
        resumeAddings,
        state,
        userId,
        id,
    }: ICreateResumeDTO): Promise<Resume> {
        const resume = await this.resumeRepository.create({
            city,
            email,
            extraInfo,
            linkedinURL,
            name,
            objectives,
            phone,
            portfolioURL,
            professionalResume,
            resumeAddings,
            state,
            userId,
            id,
        });

        return resume;
    }
}

export { CreateResumeUseCase };
