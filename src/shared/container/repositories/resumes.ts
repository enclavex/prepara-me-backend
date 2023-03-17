import { ResumeRepository } from "@modules/resume/infra/typeorm/repositories/ResumeRepository";
import { IResumeRepository } from "@modules/resume/repositories/IResumeRepository";
import { container } from "tsyringe";

container.registerSingleton<IResumeRepository>(
    "ResumeRepository",
    ResumeRepository
);
