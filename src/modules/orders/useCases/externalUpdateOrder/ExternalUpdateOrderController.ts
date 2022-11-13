import { Request, Response } from "express";
import { ExternalUpdateOrderUseCase } from "./ExternalUpdateOrderUseCase";

class ExternalUpdateOrderController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            object,
            status,
            model,
            model_id,
            headers,
            payload,
            request_url,
            retries,
            next_retry,
            deliveries,
            date_created,
            date_updated,
            signature,
            id
        } = request.body;

        const externalUpdateOrderUseCase = new ExternalUpdateOrderUseCase()

        // const product = await externalUpdateOrderUseCase.execute({
        //     name,
        //     shortName,
        //     price,
        //     duration,
        //     status,
        //     type,
        //     bestSeller,
        //     id,
        // });

        // return response.status(201).json(product);
    }
}

export { ExternalUpdateOrderController };
