import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createResume1667705820778 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "resume",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "phone",
                        type: "varchar",
                    },
                    {
                        name: "city",
                        type: "varchar",
                    },
                    {
                        name: "state",
                        type: "varchar",
                    },
                    {
                        name: "linkedinURL",
                        type: "varchar",
                    },
                    {
                        name: "portfolioURL",
                        type: "varchar",
                    },
                    {
                        name: "objectives",
                        type: "varchar",
                    },
                    {
                        name: "professionalResume",
                        type: "varchar",
                    },
                    {
                        name: "extraInfo",
                        type: "varchar",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKResumeUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "resumeAddings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "resumeId",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "initialYear",
                        type: "integer",
                    },
                    {
                        name: "finalYear",
                        type: "integer",
                    },
                    {
                        name: "institution",
                        type: "varchar",
                    },
                    {
                        name: "extraInfo",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "char",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKResumeResumeEducation",
                        referencedTableName: "resume",
                        referencedColumnNames: ["id"],
                        columnNames: ["resumeId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("resumeAddings");
        await queryRunner.dropTable("resume");
    }
}

