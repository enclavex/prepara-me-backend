import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserSurveyFieldsUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        user_id,
        NPSSurvey,
        laborRisk,
        surveyAnswered,
    }): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        user.NPSSurvey = NPSSurvey;
        user.laborRisk = laborRisk;
        user.surveyAnswered = surveyAnswered;

        const newUser = await this.usersRepository.create(user);

        return newUser;
    }
}
export { UpdateUserSurveyFieldsUseCase };

