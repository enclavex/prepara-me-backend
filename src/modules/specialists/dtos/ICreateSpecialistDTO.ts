import { SpecialistStatusEnum } from "../enums/SpecialistStatusEnum";

interface ICreateSpecialistDTO {
    name: string;
    bio: string;
    status: SpecialistStatusEnum;
    userId: string;
    linkedinUrl: string;
    id?: string
}

export { ICreateSpecialistDTO }