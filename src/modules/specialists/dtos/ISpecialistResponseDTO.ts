import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { SpecialistScheduleAvailable } from "../infra/typeorm/entities/SpecialistScheduleAvailable";

interface ISpecialistResponseDTO {
    id: string;
    name: string;
    bio: string;
    linkedinUrl: string;
    specialistScheduleAvailable: SpecialistScheduleAvailable[];
    status,
    user: IUserResponseDTO
}

export { ISpecialistResponseDTO };
