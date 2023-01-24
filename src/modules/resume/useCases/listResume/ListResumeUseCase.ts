import { Resume } from "@modules/resume/infra/typeorm/entities/Resume";
import { IResumeRepository } from "@modules/resume/repositories/IResumeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListResumeUseCase {
    constructor(
        @inject("ResumeRepository")
        private resumeRepository: IResumeRepository
    ) {}

    async execute({ userId, id }): Promise<Resume[]> {
        const resumes = await this.resumeRepository.find({
            userId,
            id,
        });

        return resumes;
    }
}

export { ListResumeUseCase };

