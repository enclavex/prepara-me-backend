import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSpecialist1656220948872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specialists",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "bio",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "linkedinUrl",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "specialists",
            new TableForeignKey({
                name: "FKSpecialistsToUsers",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["userId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("specialists");
    }

}
