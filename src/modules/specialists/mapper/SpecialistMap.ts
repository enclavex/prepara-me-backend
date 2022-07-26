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
        status,
        user,
        productSpecialist
    }: Specialist): ISpecialistResponseDTO {
        const statusMapped = status === "ACTIVE" ? "Ativo" : "Inativo";

        const specialist = instanceToInstance({
            id,
            name,
            bio,
            linkedinUrl,
            specialistScheduleAvailable,
            status: { label: statusMapped, value: status },
            user: process.env.NODE_ENV === "test" ? user : UserMap.toDTO(user),
            productSpecialist
        });

        return specialist;
    }
}

export { SpecialistMap };

