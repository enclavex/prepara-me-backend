import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { ICompanySubscriptionPlansRepository } from "@modules/company/repositories/ICompanySubscriptionPlansRepository";
import { ISubscriptionPlansRepository } from "@modules/products/repositories/ISubscriptionPlansRepository";
import { IUserProductsAvailableRepository } from "@modules/accounts/repositories/IUserProductsAvailableRepository";
import { ICompanyEmployeesRepository } from "@modules/company/repositories/ICompanyEmployeesRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("CompanySubscriptionPlansRepository")
        private companySubscriptionPlansRepository: ICompanySubscriptionPlansRepository,
        @inject("CompanyEmployeesRepository")
        private companyEmployeesRepository: ICompanyEmployeesRepository,
        @inject("SubscriptionPlansRepository")
        private subscriptionPlansRepository: ISubscriptionPlansRepository,
        @inject("UserProductsAvailableRepository")
        private userProductsAvailableRepository: IUserProductsAvailableRepository
    ) {}

    async execute({
        name,
        username,
        email,
        password,
        documentId,
        type,
        active,
        subscribeToken,
    }: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("E-mail used by another user!");
        }

        const passwordHash = await hash(password, 8);

        if (!Object.values(UserTypeEnum).includes(type)) {
            throw new AppError("Type entered wrong");
        }

        if (!documentId) {
            throw new AppError("DocumentId can't be null!");
        }

        if (!name) {
            throw new AppError("Name can't be null!");
        }

        if (!password) {
            throw new AppError("Password can't be null!");
        }

        if (!email) {
            throw new AppError("E-mail can't be null!");
        }

        const user = await this.usersRepository.create({
            name,
            username,
            email,
            password: passwordHash,
            documentId,
            type,
            active,
        });

        if (subscribeToken && user && user.id) {
            const companySubscriptionPlans =
                await this.companySubscriptionPlansRepository.find({
                    subscribeToken,
                });

            if (companySubscriptionPlans && companySubscriptionPlans[0].id) {
                let companyEmployee =
                    await this.companyEmployeesRepository.find({
                        documentId,
                    });

                if (!(companyEmployee.length > 0)) {
                    companyEmployee =
                        await this.companyEmployeesRepository.find({
                            email,
                        });
                }

                if (companyEmployee.length > 0) {
                    companyEmployee[0].userId = user.id;

                    this.companyEmployeesRepository.create(companyEmployee[0]);

                    const subscriptionPlan =
                        await this.subscriptionPlansRepository.find({
                            id: companySubscriptionPlans[0].subscriptionPlanId,
                        });

                    if (subscriptionPlan && subscriptionPlan[0]) {
                        subscriptionPlan[0].subscriptionPlanProduct.forEach(
                            async (subscriptionPlanProduct) => {
                                await this.userProductsAvailableRepository.create(
                                    {
                                        availableQuantity:
                                            subscriptionPlanProduct.availableQuantity,
                                        productId:
                                            subscriptionPlanProduct.product.id,
                                        userId: user.id,
                                    }
                                );
                            }
                        );
                    }
                }
            }
        }

        return user;
    }
}

export { CreateUserUseCase };

