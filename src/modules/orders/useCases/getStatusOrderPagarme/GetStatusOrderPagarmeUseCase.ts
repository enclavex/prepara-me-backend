import axios from "axios";

class GetStatusOrderPagarme {
    async execute({ paymentLinkId }): Promise<Object> {
        const config = {
            method: "GET",
            headers: {
                Authorization: `Basic ${Buffer.from(
                    "ak_live_AGvULM4QsyeZZLS649VEm3vpJqYmiU:x"
                ).toString("base64")}`,
                "Content-Type": "application/json",
            },
            url: `https://api.pagar.me/1/orders?payment_link_id=${paymentLinkId}`,
        };

        const orderGetted = await axios(config)
            .then((created) => {
                return created.data;
            })
            .catch((err) => {
                return err;
            });

        return orderGetted;
    }
}

export { GetStatusOrderPagarme };

