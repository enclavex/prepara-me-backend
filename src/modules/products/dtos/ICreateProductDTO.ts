import { ProductBestSellerEnum } from "../enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "../enums/ProductStatusEnum";
import { ProductTypeEnum } from "../enums/ProductTypesEnum";

interface ICreateProductDTO {
    name: string;
    shortName: string;
    price: number;
    status: ProductStatusEnum;
    type: ProductTypeEnum;
    bestSeller: ProductBestSellerEnum;
    id?: string;
}

export { ICreateProductDTO };
