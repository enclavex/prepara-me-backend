import { ProductContent } from "../infra/typeorm/entities/ProductContent";

interface IResponseProductDTO {
    id: string;
    name: string;
    shortName: string;
    status: Object;
    type: Object;
    bestSeller: Object;
    price: number;
    productContent: ProductContent[]
}

export { IResponseProductDTO };
