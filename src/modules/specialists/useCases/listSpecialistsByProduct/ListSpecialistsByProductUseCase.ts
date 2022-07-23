import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    productId: string,
    dateBegin?: Date,
    dateEnd?: Date
}

@injectable()
class ListSpecialistsByProductUseCase {
    constructor(
        @inject("ProductSpecialistRepository")
        private productSpecialistRepository: IProductsSpecialistsRepository,
        @inject("SpecialistRepository")
        private specialistRepository: ISpecialistsRepository
    ) { }

    async execute({
        productId,
        dateBegin,
        dateEnd
    }: IRequest) {
        if (dateBegin) {
            dateBegin = new Date(dateBegin)
            dateBegin.setHours(0, 0, 0)
        }

        if (dateEnd) {
            dateEnd = new Date(dateEnd)
            dateEnd.setHours(23, 59, 59)
        }

        const listSpecialistId = await this.productSpecialistRepository.listSpecialistsByProduct(productId)

        if (listSpecialistId.length === 0) {
            return null
        }

        const specialists = await this.specialistRepository.findByIds(listSpecialistId, dateBegin, dateEnd)

        return specialists
    }
}

export { ListSpecialistsByProductUseCase }