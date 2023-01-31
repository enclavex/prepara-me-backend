import { CreateOrderController } from "@modules/orders/useCases/createOrder/CreateOrderController";
import { GetStatusOrderPagarMeController } from "@modules/orders/useCases/getStatusOrderPagarme/GetStatusOrderPagarMeController";
import { ListOrderController } from "@modules/orders/useCases/listOrder/ListOrderController";
import nodeCron from "node-cron";

async function requestPagarMePaymentStatus(paymentLinkId) {
    const getStatusOrderPagarme = new GetStatusOrderPagarMeController();

    const order = await getStatusOrderPagarme.handleInternal({
        paymentLinkId,
    });

    return order;
}

async function updateOrderStatus(order) {
    const createOrderController = new CreateOrderController();

    order.dateUpdated = new Date();

    await createOrderController.handleInternal(order);
}

async function getOrdersCreated() {
    const listOrderController = new ListOrderController();

    const orders = await listOrderController.handleInternal({
        status: "CREATED",
    });

    return orders;
}

async function execute() {
    const orders = await getOrdersCreated();

    orders.forEach(async (order) => {
        switch (order.status) {
            case "CREATED":
                const orderPagarMe = await requestPagarMePaymentStatus(
                    order.pagarMeOrderId
                );

                if (orderPagarMe == undefined || orderPagarMe.length == 0) {
                    // order.status = "EXPIRED";
                } else if (orderPagarMe.length > 0) {
                    switch (orderPagarMe[0].status) {
                        case "paid":
                            order.status = "PAID";

                            break;
                        default:
                            if (new Date(order.expiresAt) < new Date()) {
                                order.status = "EXPIRED";
                                break;
                            }

                            break;
                    }
                }

                await updateOrderStatus(order);

                break;
            default:
                break;
        }
    });
}

function verifyOrderPayment() {
    nodeCron.schedule("* * * * * * ", async () => {
        try {
            execute();
        } catch (err) {
            console.log(err);
        }
    });
}

export default verifyOrderPayment;

