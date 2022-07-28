import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterColumnCompanyEmployeeUserId1659043791212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "companyEmployees",
            "userId",
            new TableColumn({
                name: "userId",
                type: "uuid",
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
                isNullable: true,
            })
        );
    }

}
