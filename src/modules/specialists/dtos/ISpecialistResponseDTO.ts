import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { SpecialistScheduleAvailable } from "../infra/typeorm/entities/SpecialistScheduleAvailable";

interface ISpecialistResponseDTO {
    id: string;
    bio: string;
    name: string;
    linkedinUrl: string;
    specialistScheduleAvailable: SpecialistScheduleAvailable[];
    user: IUserResponseDTO
}

export { ISpecialistResponseDTO };
