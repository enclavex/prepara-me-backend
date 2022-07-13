import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSubscriptionPlanProducts1657675515061
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "subscriptionPlanProducts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "subscriptionPlanId",
                        type: "uuid",
                    },
                    {
                        name: "productId",
                        type: "uuid",
                    },
                    {
                        name: "availableQuantity",
                        type: "integer",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKSubscriptionPlanProductsProducts",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["productId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKSubscriptionPlanProductsSubscriptionPlans",
                        referencedTableName: "subscriptionPlans",
                        referencedColumnNames: ["id"],
                        columnNames: ["subscriptionPlanId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("subscriptionPlanProducts");
    }
}

