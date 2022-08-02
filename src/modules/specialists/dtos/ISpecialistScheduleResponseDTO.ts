import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { IResponseProductDTO } from "@modules/products/dtos/IResponseProductDTO";
import { ISpecialistResponseDTO } from "./ISpecialistResponseDTO";

interface ISpecialistScheduleResponseDTO {
    id: string;
    comments: string;
    dateSchedule: Date;
    hangoutLink: string;
    product: IResponseProductDTO;
    specialist: ISpecialistResponseDTO;
    status: Object;
    user: IUserResponseDTO;
}

export { ISpecialistScheduleResponseDTO };

