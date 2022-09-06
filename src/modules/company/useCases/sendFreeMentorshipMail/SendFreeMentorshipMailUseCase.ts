import { ISendFreeMentorshipMailDTO } from "@modules/company/dtos/ISendFreeMentorshipMailDTO";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { resolve } from "path";

@injectable()
class SendFreeMentorshipMailUseCase {
    constructor(
        @inject("MailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute({
        name,
        email,
        phone,
        position,
        company,
    }: ISendFreeMentorshipMailDTO): Promise<void> {
        if (!name) {
            throw new AppError("Name can't be null!");
        }

        if (!email) {
            throw new AppError("E-Mail can't be null!");
        }

        if (!phone) {
            throw new AppError("Phone can't be null!");
        }

        if (!position) {
            throw new AppError("Position can't be null!");
        }

        if (!company) {
            throw new AppError("Company can't be null!");
        }

        const templatePath = resolve (
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "freeMentorship.hbs"
        );

        const variables = {
            name,
            email,
            phone,
            position,
            company,
        };

        await this.mailProvider.sendMail(
            "lucy@prepara.me",
            "Solicitação de agendamento para mentoria gratuita",
            variables,
            templatePath
        );
    }
}

export { SendFreeMentorshipMailUseCase };

