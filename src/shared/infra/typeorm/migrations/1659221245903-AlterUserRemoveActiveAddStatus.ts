import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserRemoveActiveAddStatus1659221245903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "active");

        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "status",
                type: "varchar",
                isNullable: true,
                default: "'ACTIVE'"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "status");

        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "active",
                type: "boolean",
                isNullable: true,
                default: true
            })
        );
    }

}
