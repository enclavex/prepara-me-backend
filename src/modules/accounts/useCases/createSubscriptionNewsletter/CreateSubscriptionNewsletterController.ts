import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSubscriptionNewsletterUseCase } from "./CreateSubscriptionNewsletterUseCase";

class CreateSubscriptionNewsletterController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {  email, id } =
            request.body;

        const createSubscriptionNewsletterUseCase = container.resolve(CreateSubscriptionNewsletterUseCase);

        await createSubscriptionNewsletterUseCase.execute({
            email,
            id
        });

        return response.status(201).send();
    }

}

export { CreateSubscriptionNewsletterController };
