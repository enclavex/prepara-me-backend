import { instanceToInstance } from "class-transformer";
import { IUserProductAvailableResponseDTO } from "../dtos/IUserProductAvailableResponseDTO";
import { UserProductAvailable } from "../infra/typeorm/entities/UserProductAvailable";
import { UserMap } from "./UserMap";

class UserProductsAvailableMap {
    static toDTO({
        id,
        product,
        user,
        availableQuantity,
    }: UserProductAvailable): IUserProductAvailableResponseDTO {
        const userProductAvailable = instanceToInstance({
            id,
            product,
            user: UserMap.toDTO(user),
            availableQuantity,
        });

        return userProductAvailable;
    }
}

export { UserProductsAvailableMap };

