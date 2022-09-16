import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { UserStatusEnum } from "../enums/UserStatusEnum";
import { UserTypeEnum } from "../enums/UserTypeEnum";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
    static toDTO({
        email,
        name,
        username,
        id,
        avatar,
        documentId,
        avatarUrl,
        type,
        status,
        NPSSurvey,
        laborRisk,
        surveyAnswered,
        company
    }: User): IUserResponseDTO {
        const statusMapped =
            status == UserStatusEnum.INACTIVE ? "Inativo" : "Ativo";

        let typeMapped = "";

        switch (type) {
            case UserTypeEnum.ADMIN:
                typeMapped = "Administrador";
                break;
            case UserTypeEnum.COMPANY_ADMIN:
                typeMapped = "Empresa";
                break;
            case UserTypeEnum.USER:
                typeMapped = "Usuário";
                break;
            case UserTypeEnum.SPECIALIST:
                typeMapped = "Especialista";
                break;
        }

        const user = instanceToInstance({
            email,
            name,
            username,
            id,
            avatar,
            status: { label: statusMapped, value: status },
            documentId,
            type: { label: typeMapped, value: type },
            avatarUrl,
            NPSSurvey,
            laborRisk,
            surveyAnswered,
            company
        });

        return user;
    }
}

export { UserMap };

