import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            name: "Guilherme Cordeiro",
            username: "Guilherme Cordeiro",
            email: "guilherme.teste@teste.com",
            password: "1234",
            documentId: "08113754989",
            status: UserStatusEnum.ACTIVE,
            type: UserTypeEnum.USER,
        });

        await sendForgotPasswordMailUseCase.execute(
            "guilherme.teste@teste.com"
        );

        expect(sendMail).toHaveBeenCalled();
    });

    it("should be able to create an user's token", async () => {
        const tokenGenerated = jest.spyOn(
            userTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            name: "Guilherme Cordeiro",
            username: "Guilherme Cordeiro",
            email: "guilherme.teste@teste.com",
            password: "1234",
            documentId: "08113754989",
            status: UserStatusEnum.ACTIVE,
            type: UserTypeEnum.USER,
        });

        await sendForgotPasswordMailUseCase.execute(
            "guilherme.teste@teste.com"
        );

        expect(tokenGenerated).toHaveBeenCalled();
    });
});
