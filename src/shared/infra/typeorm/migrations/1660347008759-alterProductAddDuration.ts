import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class alterProductAddDuration1660347008759
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "products",
            new TableColumn({
                name: "duration",
                type: "integer",
                isNullable: true,
                default: 1,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "duration");
    }
}

