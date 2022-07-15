import { UserTypeEnum } from "../enums/UserTypeEnum";

interface ICreateUserDTO {
    name: string;
    username: string;
    email: string;
    password: string;
    documentId: string;
    type: UserTypeEnum;
    id?: string;
    avatar?: string;
}

export { ICreateUserDTO };
