import axios from "axios";

interface ICreateOrderPagarMe {
    items: Array<Object>;
    amount: number;
}

class CreateOrderPagarMeUseCase {
    async execute({ items, amount }: ICreateOrderPagarMe): Promise<Object> {
        const data = {
            payment_config: {
                boleto: {
                    enabled: true,
                },
                credit_card: {
                    enabled: true,
                },
                default_payment_method: "credit_card",
            },
            amount,
            items,
            expires_in: 15,
            postback_config: {
                orders: "https://api.prepara.me/orders/update",
                transactions: "https://api.prepara.me/transactions/update",
            },
            review_informations: true,
        };

        const config = {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(
                    "ak_live_AGvULM4QsyeZZLS649VEm3vpJqYmiU:x"
                ).toString("base64")}`,
                "Content-Type": "application/json",
            },
            data: data,
            url: `https://api.pagar.me/1/payment_links`,
        };

        // "ak_live_AGvULM4QsyeZZLS649VEm3vpJqYmiU:x" Production
        //ak_test_JS1kghKTrKbM2iiaNvGM0xmJMIIMFc:x Test

        const orderCreated = await axios(config)
            .then((created) => {
                return created.data;
            })
            .catch((err) => {
                return err;
            });

        return orderCreated;
    }
}

export { CreateOrderPagarMeUseCase };

