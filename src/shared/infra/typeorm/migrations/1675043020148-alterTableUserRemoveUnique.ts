import {MigrationInterface, QueryRunner, TableUnique} from "typeorm";

export class alterTableUserRemoveUnique1675043020148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint('users', "UQ_fe0bb3f6520ee0469504521e710")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
