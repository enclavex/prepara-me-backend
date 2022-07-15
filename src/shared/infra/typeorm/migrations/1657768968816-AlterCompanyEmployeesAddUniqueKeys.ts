import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class AlterCompanyEmployeesAddUniqueKeys1657768968816
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraints("companyEmployees", [
            new TableUnique({
                columnNames: ["companyId", "documentId", "subscribeToken"],
                name: "UKCompanyEmployees",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint(
            "companyEmployees",
            "UKCompanyEmployees"
        );
    }
}

