import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterTableSpecialistSchedule1680490379471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "specialistSchedule",
            new TableColumn({
                name: "rating",
                type: "integer",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("specialistSchedule", "rating")
    }

}
