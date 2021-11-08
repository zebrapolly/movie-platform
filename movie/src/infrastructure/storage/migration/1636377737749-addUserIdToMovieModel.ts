import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserIdToMovieModel1636377737749 implements MigrationInterface {
    name = 'addUserIdToMovieModel1636377737749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_b16396310081b89594a4f2f289" ON "movies" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b16396310081b89594a4f2f289"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "user_id"`);
    }

}
