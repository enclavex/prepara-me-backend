import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterCompanyEmployeesUserIdTurnNull1657768753446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "companyEmployees",
            "userId",
            new TableColumn({
                name: "userId",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "companyEmployees",
            "userId",
            new TableColumn({
                name: "userId",
                type: "varchar",
                isNullable: false,
            })
        );
    }

}
