import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterUsersAddNewSurveyFields1663611091519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "realocated",
                type: "varchar",
                isNullable: false,
                default: "'NOT_REALOCATED'"
            })
        );

        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "feelingsMapJSON",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "feelingsMapJSON")
        await queryRunner.dropColumn("users", "realocated")
    }


}
