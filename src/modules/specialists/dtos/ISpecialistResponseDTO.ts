import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { SpecialistSchedule } from "../infra/typeorm/entities/SpecialistSchedule";

interface ISpecialistResponseDTO {
    id: string;
    name: string;
    bio: string;
    linkedinUrl: string;
    specialistSchedule: SpecialistSchedule[];
    status,
    user: IUserResponseDTO
}

export { ISpecialistResponseDTO };
