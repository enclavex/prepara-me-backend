import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { ISpecialistSchedulesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesRepository";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveSpecialistUseCase {
    constructor(
        @inject("SpecialistsRepository")
        private specialistsRepository: ISpecialistsRepository,
        @inject("ProductsSpecialistsRepository")
        private productsSpecialistsRepository: IProductsSpecialistsRepository,
        @inject("SpecialistSchedulesRepository")
        private specialistSchedulesRepository: ISpecialistSchedulesRepository
    ) {}

    async execute(id) {
        const productsSpecialists =
            await this.productsSpecialistsRepository.find({
                specialistId: id,
            });

        await Promise.all(
            productsSpecialists.map(async (productSpecialist) => {
                return await this.productsSpecialistsRepository.remove(
                    productSpecialist.id
                );
            })
        );

        const specialistSchedules =
            await this.specialistSchedulesRepository.find({
                specialistId: id,
            });

        await Promise.all(
            specialistSchedules.map(async (specialistSchedule) => {
                return await this.specialistSchedulesRepository.remove(
                    specialistSchedule.id
                );
            })
        );

        await this.specialistsRepository.remove(id);
    }
}

export { RemoveSpecialistUseCase };

