import { UserLaborRiskAlertEnum } from "@modules/accounts/enums/UserLaborRiskAlertEnum";
import { UserRealocatedEnum } from "@modules/accounts/enums/UserRealocatedEnum";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateCompanyEmployeeDTO } from "@modules/company/dtos/ICreateCompanyEmployeeDTO";
import { CompanyEmployee } from "@modules/company/infra/typeorm/entities/CompanyEmployee";
import { ICompanyEmployeesRepository } from "@modules/company/repositories/ICompanyEmployeesRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCompanyEmployeeUseCase {
    constructor(
        @inject("CompanyEmployeesRepository")
        private companyEmployeesRepository: ICompanyEmployeesRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        companyId,
        documentId,
        name,
        subscribeToken,
        userId,
        phone,
        email,
        id,
        easyRegister,
    }: ICreateCompanyEmployeeDTO): Promise<CompanyEmployee> {
        if (!name) {
            throw new AppError("Name can't be null");
        }

        if (!companyId) {
            throw new AppError("Company Id can't be null");
        }

        if (!documentId) {
            throw new AppError("Document Id can't be null");
        }

        if (!easyRegister) {
            throw new AppError("easyRegister can't be null");
        }

        let companyEmployeeCreated =
            await this.companyEmployeesRepository.create({
                companyId,
                documentId,
                name,
                userId,
                subscribeToken,
                phone,
                email,
                id,
                easyRegister,
            });

        if (!id && !userId && easyRegister) {
            const passwordHash = await hash(
                companyEmployeeCreated.documentId,
                8
            );

            var newEmail = "";

            if (!email) {
                newEmail = `${companyEmployeeCreated.id}@prepara.me`;
            } else {
                newEmail = email;
            }

            console.log("Dados do usuário cadastrado a partir do funcionário", {
                name: companyEmployeeCreated.name,
                username: companyEmployeeCreated.name,
                email: newEmail,
                password: passwordHash,
                documentId: companyEmployeeCreated.documentId,
                type: UserTypeEnum.USER,
                status: UserStatusEnum.ACTIVE,
                NPSSurvey: 0,
                laborRisk: 0,
                surveyAnswered: false,
                companyId,
                realocated: UserRealocatedEnum.NOT_REALOCATED,
                laborRiskAlert: UserLaborRiskAlertEnum.NORMAL,
                expiresDate: new Date(),
                periodTest: new Date(),
                subscribeToken: companyEmployeeCreated.subscribeToken,
            });

            const userCreated = await this.usersRepository.create({
                name: companyEmployeeCreated.name,
                username: companyEmployeeCreated.name,
                email: newEmail,
                password: passwordHash,
                documentId: companyEmployeeCreated.documentId,
                type: UserTypeEnum.USER,
                status: UserStatusEnum.ACTIVE,
                NPSSurvey: 0,
                laborRisk: 0,
                surveyAnswered: false,
                companyId,
                realocated: UserRealocatedEnum.NOT_REALOCATED,
                laborRiskAlert: UserLaborRiskAlertEnum.NORMAL,
                expiresDate: new Date(),
                periodTest: new Date(),
                subscribeToken: companyEmployeeCreated.subscribeToken,
            });

            companyEmployeeCreated =
                await this.companyEmployeesRepository.create({
                    companyId: companyEmployeeCreated.companyId,
                    documentId: companyEmployeeCreated.documentId,
                    name: companyEmployeeCreated.name,
                    userId: userCreated.id,
                    subscribeToken: companyEmployeeCreated.subscribeToken,
                    phone: companyEmployeeCreated.phone,
                    email: newEmail,
                    id: companyEmployeeCreated.id,
                    easyRegister: companyEmployeeCreated.easyRegister,
                });
        }

        return companyEmployeeCreated;
    }
}

export { CreateCompanyEmployeeUseCase };

