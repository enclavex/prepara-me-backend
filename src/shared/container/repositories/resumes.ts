import { ResumeRepository } from "@modules/resume/infra/typeorm/repositories/ResumeRepository";
import { IResumeRepository } from "@modules/resume/repositories/IResumeRepository";
import { container, delay } from 'tsyringe';

container.registerSingleton<IResumeRepository>(
    "ResumeRepository",
    delay(() => ResumeRepository)
);
