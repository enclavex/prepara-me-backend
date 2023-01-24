import { ResumeAddingsTypeEnum } from "../enums/ResumeAddingsTypeEnum";

interface ICreateResumeAddingsDTO {
    resumeId: string;
    name: string;
    initialYear: number;
    finalYear: number;
    instituition: string;
    extraInfo: string;
    type: ResumeAddingsTypeEnum;
    id?: string;
}

export { ICreateResumeAddingsDTO };
