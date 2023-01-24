import { IResumeRepository } from "@modules/resume/repositories/IResumeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveResumeUseCase {
    constructor(
        @inject("ResumeRepository")
        private resumeRepository: IResumeRepository
    ) {}

    async execute(id) {
        await this.resumeRepository.remove(id);

        return true;
    }
}

export { RemoveResumeUseCase };

