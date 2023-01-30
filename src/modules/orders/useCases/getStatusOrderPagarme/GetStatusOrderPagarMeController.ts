import { Request, Response } from "express";
import { GetStatusOrderPagarme } from "./GetStatusOrderPagarmeUseCase";

class GetStatusOrderPagarMeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { paymentLinkId } = request.query;
        
        const getStatusOrderPagarme = new GetStatusOrderPagarme();

        const order = await getStatusOrderPagarme.execute({ paymentLinkId });

        return response.status(201).json(order);
    }
    
    async handleInternal(data): Promise<any> {
        const { paymentLinkId } = data;
        
        const getStatusOrderPagarme = new GetStatusOrderPagarme();
        
        const order = await getStatusOrderPagarme.execute({ paymentLinkId });
        
        return order;
    }
}

export { GetStatusOrderPagarMeController };

