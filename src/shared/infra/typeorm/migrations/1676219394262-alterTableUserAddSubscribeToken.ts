import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterTableUserAddSubscribeToken1676219394262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "subscribeToken",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "subscribeToken")
    }

}
