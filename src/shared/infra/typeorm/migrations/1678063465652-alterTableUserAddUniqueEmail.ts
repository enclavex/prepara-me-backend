import {MigrationInterface, QueryRunner, TableUnique} from "typeorm";

export class alterTableUserAddUniqueEmail1678063465652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraints("users", [
            new TableUnique({
                columnNames: ["email"],
                name: "UKUsersEmail",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint(
            "users",
            "UKUsersEmail"
        );
    }

}
