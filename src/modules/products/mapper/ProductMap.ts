import { instanceToInstance } from "class-transformer";
import { IResponseProductDTO } from "../dtos/IResponseProductDTO";
import { Product } from "../infra/typeorm/entities/Product";

class ProductMap {
    static toDTO({
        id,
        name,
        shortName,
        status,
        type,
        bestSeller,
        price,
    }: Product): IResponseProductDTO {
        const statusMapped = status === "ACTIVE" ? "Ativo" : "Inativo";
        const typeMapped = type === "SCHEDULED" ? "Agendado" : "Não Agendado";
        const bestSellerMapped =
            bestSeller === "BEST_SELLER" ? "Mais Vendido" : "Normal";

        const product = instanceToInstance({
            id,
            name,
            shortName,
            status: { label: statusMapped, value: status },
            type: { label: typeMapped, value: type },
            bestSeller: { label: bestSellerMapped, value: bestSeller },
            price,
        });

        return product;
    }
}

export { ProductMap };

