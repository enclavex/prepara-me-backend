import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class userProductAvailable1657675648684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "userProductsAvailable",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                    },
                    {
                        name: "productId",
                        type: "uuid",
                    },
                    {
                        name: "availableQuantity",
                        type: "integer",
                    },
                    
                ],
                foreignKeys: [
                    {
                        name: "FKUserProductsAvailableUsers",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["userId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKUserProductsAvailableProducts",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["productId"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("userProductsAvailable");
    }

}
