import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class companySubscriptionPlan1657675592482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "companySubscriptionPlans",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "companyId",
                        type: "uuid",
                    },
                    {
                        name: "subscriptionPlanId",
                        type: "uuid",
                    },
                    {
                        name: "startDate",
                        type: "timestamp",
                    },
                    {
                        name: "endDate",
                        type: "timestamp",
                    },
                    {
                        name: "subscribeToken",
                        type: "varchar",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKCompanySubscriptionPlansCompanies",
                        referencedTableName: "companies",
                        referencedColumnNames: ["id"],
                        columnNames: ["companyId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKCompanySubscriptionPlansSubscriptionPlans",
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
    }

}
