import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from "typeorm";

export class CreateSpecialistScheduleAvailable1656374152535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specialistScheduleAvailable",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "dateSchedule",
                        type: "timestamp",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "specialistId",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isNullable: true
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "specialistScheduleAvailable",
            new TableForeignKey({
                name: "FKspecialistScheduleAvailableToSpecialists",
                referencedTableName: "specialists",
                referencedColumnNames: ["id"],
                columnNames: ["specialistId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "specialistScheduleAvailable",
            new TableForeignKey({
                name: "FKspecialistScheduleAvailableToUsers",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["userId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createUniqueConstraints(
            "specialistScheduleAvailable",
            [
                new TableUnique({
                    columnNames: [
                        "dateSchedule",
                        "specialistId"
                    ],
                    name: "UKSpecialistScheduleAvailable"
                })
            ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("specialistScheduleAvailable");
    }

}
