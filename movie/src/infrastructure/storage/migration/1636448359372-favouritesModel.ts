import { MigrationInterface, QueryRunner } from 'typeorm';

export class favouritesModel1636448359372 implements MigrationInterface {
	name = 'favouritesModel1636448359372';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "favourites" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "movie_id" uuid NOT NULL, CONSTRAINT "PK_173e5d5cc35490bf1de2d2d3739" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ffb0866c42b7ff4d6e5131f3dc" ON "favourites" ("user_id") `,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_3a66a48abcaf9a372e7abfb685" ON "favourites" ("movie_id", "user_id") `,
		);
		await queryRunner.query(
			`ALTER TABLE "favourites" ADD CONSTRAINT "FK_2939ea3728c96550c8e0bf5dbe3" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "favourites" DROP CONSTRAINT "FK_2939ea3728c96550c8e0bf5dbe3"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_ffb0866c42b7ff4d6e5131f3dc"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_3a66a48abcaf9a372e7abfb685"`,
		);
		await queryRunner.query(`DROP TABLE "favourites"`);
	}
}
