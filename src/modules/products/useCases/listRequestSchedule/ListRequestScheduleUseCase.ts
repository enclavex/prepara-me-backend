import { IRequestScheduleRepository } from "@modules/products/repositories/IRequestScheduleRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRequestScheduleUseCase {
    constructor(
        @inject("RequestScheduleRepository")
        private requestScheduleRepository: IRequestScheduleRepository
    ) {}

    async execute({ id }) {
        const requestSchedules = this.requestScheduleRepository.find({ id });

        return requestSchedules;
    }
}

export { ListRequestScheduleUseCase };

