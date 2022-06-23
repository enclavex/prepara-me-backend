import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateProductContent1655684404692 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "productContents",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "content",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "productId",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "productContents",
            new TableForeignKey({
                name: "FKProductContentsToProducts",
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                columnNames: ["productId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("productContents");
    }
}
