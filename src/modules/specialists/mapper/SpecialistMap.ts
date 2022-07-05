import { UserMap } from "@modules/accounts/mapper/UserMap";
import { instanceToInstance } from "class-transformer";
import { ISpecialistResponseDTO } from "../dtos/ISpecialistResponseDTO";
import { Specialist } from "../infra/typeorm/entities/Specialist";

class SpecialistMap {
    static toDTO({
        id,
        name,
        bio,
        linkedinUrl,
        specialistScheduleAvailable,
        user
    }: Specialist): ISpecialistResponseDTO {
        const specialist = instanceToInstance({
            id,
            name,
            bio,
            linkedinUrl,
            specialistScheduleAvailable,
            user: UserMap.toDTO(user),
        });

        return specialist;
    }
}

export { SpecialistMap };
