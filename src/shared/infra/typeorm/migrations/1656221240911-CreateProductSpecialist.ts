import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductSpecialist1656221240911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "productSpecialist",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "productId",
                        type: "uuid",
                    },
                    {
                        name: "specialistId",
                        type: "uuid",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "productSpecialist",
            new TableForeignKey({
                name: "FKproductSpecialistToProducts",
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                columnNames: ["productId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "productSpecialist",
            new TableForeignKey({
                name: "FKproductSpecialistToSpecialists",
                referencedTableName: "specialists",
                referencedColumnNames: ["id"],
                columnNames: ["specialistId"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("productSpecialist");
    }

}
