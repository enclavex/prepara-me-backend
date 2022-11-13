import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class alterUserCreateOrder1668339498142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
                        type: "decimal"
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
    }

}
