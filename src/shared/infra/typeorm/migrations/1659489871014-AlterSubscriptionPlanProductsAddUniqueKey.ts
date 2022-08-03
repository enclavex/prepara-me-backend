import {MigrationInterface, QueryRunner, TableUnique} from "typeorm";

export class AlterSubscriptionPlanProductsAddUniqueKey1659489871014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable("subscriptionPlanProducts");
        
        await queryRunner.createUniqueConstraints("subscriptionPlanProducts", [
            new TableUnique({
                columnNames: ["subscriptionPlanId", "productId"],
                name: "UKsubscriptionPlanProducts",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint(
            "subscriptionPlanProducts",
            "UKsubscriptionPlanProducts"
        );
    }

}
