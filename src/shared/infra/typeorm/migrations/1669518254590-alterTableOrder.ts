import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class alterTableOrder1669518254590 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orderItem");
        await queryRunner.dropTable("orders");

        await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "companyId",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "dateCreated",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "dateUpdated",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "expiresAt",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "ordersPaid",
                        type: "integer",
                        isNullable: true,
                    },
                    {
                        name: "pagarMeOrderId",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "amount",
                        type: "decimal",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "shortId",
                        type: "varchar",
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKOrderUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );

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
        await queryRunner.dropTable("orders");

        await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                    {
                        name: "object",
                        type: "varchar",
                    },
                    {
                        name: "status",
                        type: "varchar",
                    },
                    {
                        name: "model",
                        type: "varchar",
                    },
                    {
                        name: "modelId",
                        type: "varchar",
                    },
                    {
                        name: "headers",
                        type: "varchar",
                    },
                    {
                        name: "payload",
                        type: "varchar",
                    },
                    {
                        name: "requestUrl",
                        type: "varchar",
                    },
                    {
                        name: "retries",
                        type: "varchar",
                    },
                    {
                        name: "nextRetry",
                        type: "varchar",
                    },
                    {
                        name: "deliveries",
                        type: "varchar",
                    },
                    {
                        name: "dateCreated",
                        type: "timestamp",
                    },
                    {
                        name: "dateUpdated",
                        type: "timestamp",
                    },
                    {
                        name: "signature",
                        type: "varchar",
                    },
                    {
                        name: "pagarMeOrderId",
                        type: "varchar",
                    },
                    {
                        name: "amount",
                        type: "decimal",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKOrderUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );

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
}

