import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserExpiresDateUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
    ) {}

    async execute({ user_id }): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        let date = new Date();

        //Calc remaining days to expire test period
        let periodTestDaysRemaining = this.dayjsDateProvider.compareInDays(
            date,
            new Date(user.periodTest)
        );

        let periodTestRemaining = periodTestDaysRemaining * -1;

        periodTestRemaining = periodTestRemaining > 0 ? periodTestRemaining : 0;

        //Calc remaining days to expire kitPro
        let kitProDaysRemaining = this.dayjsDateProvider.compareInDays(
            date,
            new Date(user.expiresDate)
        );

        let kitProPeriodRemaining = kitProDaysRemaining * -1;

        kitProPeriodRemaining =
            kitProPeriodRemaining > 0 ? kitProPeriodRemaining : 0;

        //Calc new expires date
        date.setDate(
            date.getDate() + (90 + kitProPeriodRemaining + periodTestRemaining)
        );

        user.expiresDate = date;

        //Update user
        const updatedUser = await this.usersRepository.create(user);

        return updatedUser;
    }
}
export { UpdateUserExpiresDateUseCase };

