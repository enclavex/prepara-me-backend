import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
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
        active,
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            email,
            name,
            username,
            id,
            avatar,
            active,
            documentId,
            type,
            avatarUrl,
        });

        return user;
    }
}

export { UserMap };
