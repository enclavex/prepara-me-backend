import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterOrderAddUrlPagarme1674348682372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "orders",
            new TableColumn({
                name: "urlPagarMe",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("orders", "urlPagarMe")
    }

}
