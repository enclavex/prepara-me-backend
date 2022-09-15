import { UserStatusEnum } from "../enums/UserStatusEnum";
import { UserTypeEnum } from "../enums/UserTypeEnum";

interface ICreateUserDTO {
    name: string;
    username: string;
    email: string;
    password: string;
    documentId: string;
    type: UserTypeEnum;
    status: UserStatusEnum;
    id?: string;
    avatar?: string;
    subscribeToken?: string;
    laborRisk?: number;
    NPSSurvey?: number;
    surveyAnswered?: boolean;
}

export { ICreateUserDTO };

