import { IUserProductsAvailableRepository } from "@modules/accounts/repositories/IUserProductsAvailableRepository";
import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO";
import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum";
import { SpecialistSchedule } from "@modules/specialists/infra/typeorm/entities/SpecialistSchedule";
import { ISpecialistSchedulesRepository } from "@modules/specialists/repositories/ISpecialistSchedulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CancelSpecialistScheduleUseCase {
    constructor(
        @inject("SpecialistSchedulesRepository")
        private specialistSchedulesRepository: ISpecialistSchedulesRepository,
        @inject("UserProductsAvailableRepository")
        private userProductsAvailableRepository: IUserProductsAvailableRepository,
    ) {}

    async execute({
        id,
    }: ICreateSpecialistScheduleDTO): Promise<SpecialistSchedule> {
        const specialistsSchedule =
            await this.specialistSchedulesRepository.find({
                id,
            });

        const specialistSchedule = specialistsSchedule[0];

        const userId = specialistSchedule.userId;
        const productId = specialistSchedule.productId;

        if (userId && productId) {
            const userProducts =
                await this.userProductsAvailableRepository.find({
                    productId,
                    userId,
                });

            if (userProducts.length > 0) {
                const userProduct = userProducts[0];

                userProduct.availableQuantity++;

                await this.userProductsAvailableRepository.create({
                    availableQuantity: userProduct.availableQuantity,
                    productId: userProduct.product.id,
                    userId: userProduct.user.id,
                    id: userProduct.id,
                });
            }
        }

        const specialistScheduleUpdated =
            await this.specialistSchedulesRepository.create({
                dateSchedule: specialistSchedule.dateSchedule,
                specialistId: specialistSchedule.specialistId,
                status: SpecialistScheduleStatusEnum.AVAILABLE,
                productId: null,
                userId: null,
                comments: null,
                hangoutLink: null,
                scheduleEventId: null,
                id,
            });

        return specialistScheduleUpdated;
    }
}

export { CancelSpecialistScheduleUseCase };

