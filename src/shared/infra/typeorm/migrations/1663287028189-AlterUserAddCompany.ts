import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddCompany1663287028189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "companyId",
                type: "uuid",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "companyId")
    }

}
