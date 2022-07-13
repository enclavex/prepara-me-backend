import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class companyEmployee1657675637360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "companyEmployees",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "companyId",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "documentId",
                        type: "varchar",
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCompanyEmployeesCompanies",
                        referencedTableName: "companies",
                        referencedColumnNames: ["id"],
                        columnNames: ["companyId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKCompanyEmployeesUsers",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("companyEmployees");
    }

}
