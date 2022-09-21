import { Company } from "@modules/company/infra/typeorm/entities/Company";

interface IUserResponseDTO {
    email: string;
    name: string;
    username: string;
    id: string;
    avatar: string;
    status: Object;
    documentId: string;
    type: Object;
    avatarUrl(): string;
    laborRisk?: number;
    NPSSurvey?: number;
    surveyAnswered?: boolean;
    company?: Company;
    realocated: Object;
    feelingsMapJSON: string;
}

export { IUserResponseDTO };

