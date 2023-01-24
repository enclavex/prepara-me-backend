import { ResumeAddings } from "../infra/typeorm/entities/ResumeAddings";

interface ICreateResumeDTO {
    userId: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    linkedinURL: string;
    portfolioURL: string;
    objectives: string;
    professionalResume: string;
    extraInfo: string;
    resumeAddings: ResumeAddings[]
    id?: string;
}

export { ICreateResumeDTO };
