import { UserStatusEnum } from "../enums/UserStatusEnum";
import { UserTypeEnum } from "../enums/UserTypeEnum";

interface IUserResponseDTO {
    email: string;
    name: string;
    username: string;
    id: string;
    avatar: string;
    active: UserStatusEnum;
    documentId: string;
    type: UserTypeEnum;
    avatarUrl(): string;
}

export { IUserResponseDTO };
