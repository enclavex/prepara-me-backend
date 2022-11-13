import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class alterUserCreateOrderItem1668339503449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "orderItem",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "orderId",
                        type: "uuid",
                    },
                    {
                        name: "productId",
                        type: "uuid",
                    },
                    {
                        name: "amount",
                        type: "decimal",
                    },
                    {
                        name: "quantity",
                        type: "integer",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKOrderItemOrder",
                        referencedTableName: "orders",
                        referencedColumnNames: ["id"],
                        columnNames: ["orderId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKOrderItemProduct",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["productId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orderItem");
    }

}
