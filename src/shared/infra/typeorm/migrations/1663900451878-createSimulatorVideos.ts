import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class createSimulatorVideos1663900451878 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("questionsGroup");

        await queryRunner.createTable(
            new Table({
                name: "simulatorVideosGroup",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "active",
                        type: "varchar",
                    },
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "simulatorVideo",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "question",
                        type: "varchar",
                    },
                    {
                        name: "linkVideo",
                        type: "varchar",
                    },
                    {
                        name: "tip",
                        type: "varchar",
                    },
                    {
                        name: "objective",
                        type: "varchar",
                    },
                    {
                        name: "necessariesSkills",
                        type: "varchar",
                    },
                    {
                        name: "answerStrategy",
                        type: "varchar",
                    },
                    {
                        name: "avoid",
                        type: "varchar",
                    },
                    {
                        name: "simulatorVideosGroupId",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "simulatorVideo",
            new TableForeignKey({
                name: "FKSimulatorVideoToSimulatorVideosGroup",
                referencedTableName: "simulatorVideosGroup",
                referencedColumnNames: ["id"],
                columnNames: ["simulatorVideosGroupId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("simulatorVideo");
        await queryRunner.dropTable("simulatorVideosGroup");

        await queryRunner.createTable(
            new Table({
                name: "questionsGroup",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "active",
                        type: "varchar",
                    },
                ],
            })
        );
    }
}

