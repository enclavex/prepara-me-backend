import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterUserAddSimulatorExpires1668339478641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "expiresDate",
                type: "timestamp",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "expiresDate")
    }

}
