import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class alterSimulatorVideos1667773782799 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("simulatorVideo");

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
                        isNullable: true,
                    },
                    {
                        name: "linkVideo",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "tip",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "objective",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "necessariesSkills",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "answerStrategy",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "avoid",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "simulatorVideosGroupId",
                        type: "uuid",
                        isNullable: true,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("simulatorVideo");

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
    }
}

