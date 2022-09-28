import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterUserAddAlertLaborRisk1664280417552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "laborRiskAlert",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "laborRiskAlert")
    }

}
