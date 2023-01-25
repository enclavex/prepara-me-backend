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
        status,
        subscribeToken,
        id,
        NPSSurvey,
        laborRisk,
        surveyAnswered,
        companyId,
        realocated,
        laborRiskAlert,
        expiresDate,
        periodTest
    }: ICreateUserDTO): Promise<User> {
        var userFind;

        const addDays = function(days) {
            var date = new Date();

            date.setDate(date.getDate() + days);
            
            return date;
        }

        if (id) {
            userFind = await this.usersRepository.findById(id);


            if (userFind && userFind.id !== id) {
                throw new AppError("E-mail used by another user!");
            }
        }

        let passwordHash = "";

        if (!userFind) {
            if (!password) {
                throw new AppError("Password can't be null!");
            }

            passwordHash = await hash(password, 8);

            periodTest  = addDays(7)
            expiresDate = null;
        } else {
            username = userFind.name;
            passwordHash = userFind.password;
        }

        if (!userFind) {
            if (!Object.values(UserTypeEnum).includes(type)) {
                throw new AppError("Type entered wrong");
            }
        }

        if (!documentId) {
            throw new AppError("DocumentId can't be null!");
        }

        if (!name) {
            throw new AppError("Name can't be null!");
        }

        if (!email) {
            throw new AppError("E-mail can't be null!");
        }

        const userCreated = await this.usersRepository.create({
            name,
            username,
            email,
            password: passwordHash,
            documentId,
            type,
            status,
            id,
            NPSSurvey,
            laborRisk,
            surveyAnswered,
            companyId,
            realocated,
            laborRiskAlert,
            expiresDate,
            periodTest
        });

        if (subscribeToken && userCreated && userCreated.id && !userFind) {
            const companySubscriptionPlans =
                await this.companySubscriptionPlansRepository.find({
                    subscribeToken,
                });

            if (companySubscriptionPlans && companySubscriptionPlans[0].id) {
                let companyEmployee =
                    await this.companyEmployeesRepository.find({
                        documentId,
                        notUserId: "true",
                    });

                if (!(companyEmployee.length > 0)) {
                    companyEmployee =
                        await this.companyEmployeesRepository.find({
                            email,
                            notUserId: "true",
                        });
                }

                if (companyEmployee.length > 0) {
                    companyEmployee[0].userId = userCreated.id;

                    this.companyEmployeesRepository.create(companyEmployee[0]);

                    const subscriptionPlan =
                        await this.subscriptionPlansRepository.find({
                            id: companySubscriptionPlans[0].subscriptionPlanId,
                        });

                    if (subscriptionPlan && subscriptionPlan[0]) {
                        subscriptionPlan[0].subscriptionPlanProduct.forEach(
                            async (subscriptionPlanProduct) => {
                                if (subscriptionPlanProduct.product.id == '5fca32d9-2abd-42a1-9043-2920ef156530') {
                                    expiresDate = addDays(90);

                                    await this.usersRepository.create({
                                        name,
                                        username,
                                        email,
                                        password: passwordHash,
                                        documentId,
                                        type,
                                        status,
                                        id,
                                        NPSSurvey,
                                        laborRisk,
                                        surveyAnswered,
                                        companyId,
                                        realocated,
                                        laborRiskAlert,
                                        expiresDate,
                                        periodTest
                                    });
                                }

                                await this.userProductsAvailableRepository.create(
                                    {
                                        availableQuantity:
                                            subscriptionPlanProduct.availableQuantity,
                                        productId:
                                            subscriptionPlanProduct.product.id,
                                        userId: userCreated.id,
                                    }
                                );
                            }
                        );
                    }
                }
            }
        }

        return userCreated;
    }
}

export { CreateUserUseCase };

