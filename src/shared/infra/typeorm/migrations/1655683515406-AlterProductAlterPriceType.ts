import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterProductAlterPriceType1655683515406
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "products",
            "price",
            new TableColumn({
                name: "price",
                type: "decimal",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "products",
            "price",
            new TableColumn({
                name: "price",
                type: "integer",
                isNullable: true,
            })
        );
    }
}
