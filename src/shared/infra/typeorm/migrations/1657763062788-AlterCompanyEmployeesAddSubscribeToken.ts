import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterCompanyEmployeesAddSubscribeToken1657763062788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "companyEmployees",
            new TableColumn({
                name: "subscribeToken",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("companyEmployees", "subscribeToken");
    }

}
