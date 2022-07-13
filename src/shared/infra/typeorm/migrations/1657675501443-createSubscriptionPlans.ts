import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSubscriptionPlans1657675501443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "subscriptionPlans",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "price",
                        type: "decimal"
                    },
                    {
                        name: "status",
                        type: "varchar"
                    },
                    {
                        name: "type",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("subscriptionPlans");
    }

}
