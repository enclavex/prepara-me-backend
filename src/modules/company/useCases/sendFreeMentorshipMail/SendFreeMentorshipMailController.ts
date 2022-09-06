import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendFreeMentorshipMailUseCase } from "./SendFreeMentorshipMailUseCase";

class SendFreeMentorshipMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, phone, position, company } = request.body;

        const sendFreeMentorshipMailUseCase = container.resolve(
            SendFreeMentorshipMailUseCase
        );

        await sendFreeMentorshipMailUseCase.execute({
            name,
            email,
            phone,
            position,
            company,
        });

        return response.status(200).send();
    }
}

export { SendFreeMentorshipMailController };

