import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterUserAddTestPeriod1674337039398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "periodTest",
                type: "timestamp",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "periodTest")
    }

}
