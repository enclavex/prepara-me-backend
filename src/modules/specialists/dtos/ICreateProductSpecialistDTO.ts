import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { Specialist } from "../infra/typeorm/entities/Specialist";

interface ICreateProductSpecialistDTO {
    product: Product;
    specialist: Specialist;
    id?: String;
}

export { ICreateProductSpecialistDTO }