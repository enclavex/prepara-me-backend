import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserLaborRiskAlertUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        user_id,
        laborRiskAlert,
    }): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        user.laborRiskAlert = laborRiskAlert;

        const userUpdated = await this.usersRepository.create(user);

        return userUpdated;
    }
}
export { UpdateUserLaborRiskAlertUseCase };

