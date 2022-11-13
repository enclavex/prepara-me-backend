import { CreateOrderController } from "@modules/orders/useCases/createOrder/CreateOrderController";
import { CreateOrderPagarMeController } from "@modules/orders/useCases/createOrderPagarMe/CreateOrderPagarMeController";
import { Router } from "express";

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
ordersRoutes.post("/update", createOrderController.handle);

const createOrderPagarMeController = new CreateOrderPagarMeController();
ordersRoutes.post("/pagarme", createOrderPagarMeController.handle);

export { ordersRoutes };

