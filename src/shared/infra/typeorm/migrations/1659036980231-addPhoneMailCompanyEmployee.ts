import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addPhoneMailCompanyEmployee1659036980231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "companyEmployees",
            new TableColumn({
                name: "phone",
                type: "varchar",
                isNullable: true,
            })
        );

        await queryRunner.addColumn(
            "companyEmployees",
            new TableColumn({
                name: "email",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("companyEmployees", "email");
        await queryRunner.dropColumn("companyEmployees", "phone");
    }

}
