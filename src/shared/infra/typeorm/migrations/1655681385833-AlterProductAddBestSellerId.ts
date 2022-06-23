import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterProductAddBestSellerId1655681385833
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "products",
            new TableColumn({
                name: "bestSeller",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "bestSeller");
    }
}
