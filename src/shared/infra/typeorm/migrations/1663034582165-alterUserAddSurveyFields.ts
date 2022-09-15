import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class alterUserAddSurveyFields1663034582165
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "laborRisk",
                type: "decimal",
                isNullable: true,
                default: 0,
            })
        );

        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "NPSSurvey",
                type: "integer",
                isNullable: true,
                default: 0,
            })
        );

        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "surveyAnswered",
                type: "boolean",
                isNullable: true,
                default: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "surveyAnswered")
        await queryRunner.dropColumn("users", "NPSSurvey")
        await queryRunner.dropColumn("users", "laborRisk")
    }
}

