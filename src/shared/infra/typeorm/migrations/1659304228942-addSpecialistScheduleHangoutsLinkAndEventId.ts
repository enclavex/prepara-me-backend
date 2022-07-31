import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addSpecialistScheduleHangoutsLinkAndEventId1659304228942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "specialistSchedule",
            new TableColumn({
                name: "hangoutLink",
                type: "varchar",
                isNullable: true
            })
        );

        await queryRunner.addColumn(
            "specialistSchedule",
            new TableColumn({
                name: "scheduleEventId",
                type: "varchar",
                isNullable: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("specialistSchedule", "hangoutLink");
        await queryRunner.dropColumn("specialistSchedule", "scheduleEventId");
    }

}
