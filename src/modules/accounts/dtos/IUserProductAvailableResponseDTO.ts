import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IUserResponseDTO } from "./IUserResponseDTO";

interface IUserProductAvailableResponseDTO {
    id: string;
    user: IUserResponseDTO;
    product: Product;
    availableQuantity: number;
}

export { IUserProductAvailableResponseDTO };

