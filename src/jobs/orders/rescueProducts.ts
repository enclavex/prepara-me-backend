import { CreateUserProductAvailableController } from "@modules/accounts/useCases/createUserProductAvailable/CreateUserProductAvailableController";
import { UpdateUserExpiresDateController } from "@modules/accounts/useCases/updateUserExpiresDate/UpdateUserExpiresDateController";
import { CreateOrderController } from "@modules/orders/useCases/createOrder/CreateOrderController";
import { ListOrderController } from "@modules/orders/useCases/listOrder/ListOrderController";

import nodeCron from "node-cron";

async function getOrdersPaid() {
    const listOrderController = new ListOrderController();

    const orders = await listOrderController.handleInternal({
        status: "PAID",
    });

    return orders;
}

async function updateUserExpiresDate(userId) {
    const updateUserExpiresDateController =
        new UpdateUserExpiresDateController();

    updateUserExpiresDateController.handleInternal({ userId });
}

async function updateOrderStatus(order) {
    const createOrderController = new CreateOrderController();

    order.dateUpdated = new Date();

    await createOrderController.handleInternal(order);
}

async function execute() {
    const orders = await getOrdersPaid();

    orders.forEach((order) => {
        order.orderItem.forEach(async (item) => {
            //Verify kit pro adquired
            if (
                item.productId == "b2dda7e3-a6f6-4771-b59a-eeb8b7b5769a" ||
                item.productId == "5fca32d9-2abd-42a1-9043-2920ef156530"
            ) {
                updateUserExpiresDate(order.userId);
            } else {
                const createUserProductAvailableController =
                    new CreateUserProductAvailableController();

                createUserProductAvailableController.handleInternal({
                    userId: order.userId,
                    productId: item.productId,
                    availableQuantity: item.quantity,
                });
            }
        });

        order.status = "RESCUED";

        updateOrderStatus(order);
    });
}

function rescueProducts() {
    nodeCron.schedule("* * * * * * ", async () => {
        try {
            execute();
        } catch (err) {
            console.log(err);
        }
    });
}

export default rescueProducts;

