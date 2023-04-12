import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterTableCompanyEmployeeAddNewColumns1681310446713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "companyEmployees",
            new TableColumn({
                name: "easyRegister",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("companyEmployees", "easyRegister")
    }

}
