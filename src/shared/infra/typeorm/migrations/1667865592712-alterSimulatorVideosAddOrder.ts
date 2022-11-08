import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class alterSimulatorVideosAddOrder1667865592712
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "simulatorVideosGroup",
            new TableColumn({
                name: "order",
                type: "integer",
                isNullable: true,
            })
        );

        await queryRunner.addColumn(
            "simulatorVideo",
            new TableColumn({
                name: "order",
                type: "integer",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("simulatorVideosGroup", "order")
        await queryRunner.dropColumn("simulatorVideo", "order")
    }
}

