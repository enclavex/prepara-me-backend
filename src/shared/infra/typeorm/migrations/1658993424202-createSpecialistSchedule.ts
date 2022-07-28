import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique} from "typeorm";

export class createSpecialistSchedule1658993424202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specialistSchedule",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "dateSchedule",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "specialistId",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "productId",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "comments",
                        type: "varchar",
                        isNullable: true,
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "specialistSchedule",
            new TableForeignKey({
                name: "FKspecialistScheduleToSpecialists",
                referencedTableName: "specialists",
                referencedColumnNames: ["id"],
                columnNames: ["specialistId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "specialistSchedule",
            new TableForeignKey({
                name: "FKspecialistScheduleToUsers",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["userId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "specialistSchedule",
            new TableForeignKey({
                name: "FKspecialistScheduleToProducts",
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                columnNames: ["productId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createUniqueConstraints(
            "specialistSchedule",
            [
                new TableUnique({
                    columnNames: ["dateSchedule", "specialistId"],
                    name: "UKSpecialistSchedule",
                }),
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("specialistSchedule");
    }

}
