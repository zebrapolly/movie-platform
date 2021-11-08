import { MigrationInterface, QueryRunner } from 'typeorm';

export class initSchema1636372741065 implements MigrationInterface {
	name = 'initSchema1636372741065';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "persons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "person_to_film" ("movie_id" uuid NOT NULL, "person_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_8fc094bc476ffe454d228ed4672" PRIMARY KEY ("movie_id", "person_id", "role_id"))`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_8fc094bc476ffe454d228ed467" ON "person_to_film" ("movie_id", "person_id", "role_id") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c04a7f782404851e203c4b6149" ON "person_to_film" ("movie_id") `,
		);
		await queryRunner.query(
			`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "synopsis" character varying NOT NULL, "release_date" TIMESTAMP WITH TIME ZONE NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "movies_genres" ("movie_id" uuid NOT NULL, "genre_id" uuid NOT NULL, CONSTRAINT "PK_f880d4307800f050c252966573e" PRIMARY KEY ("movie_id", "genre_id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4729d9b8d47986f936cb5e9540" ON "movies_genres" ("movie_id") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ef4fe5a96b6f83e9472bdaefbc" ON "movies_genres" ("genre_id") `,
		);
		await queryRunner.query(
			`ALTER TABLE "person_to_film" ADD CONSTRAINT "FK_c04a7f782404851e203c4b61495" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "person_to_film" ADD CONSTRAINT "FK_216ef3ca1f1fd93aa906ccbbedc" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "person_to_film" ADD CONSTRAINT "FK_03294835e15994de4e9e78b8de2" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "movies_genres" ADD CONSTRAINT "FK_4729d9b8d47986f936cb5e9540e" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "movies_genres" ADD CONSTRAINT "FK_ef4fe5a96b6f83e9472bdaefbc5" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "movies_genres" DROP CONSTRAINT "FK_ef4fe5a96b6f83e9472bdaefbc5"`,
		);
		await queryRunner.query(
			`ALTER TABLE "movies_genres" DROP CONSTRAINT "FK_4729d9b8d47986f936cb5e9540e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "person_to_film" DROP CONSTRAINT "FK_03294835e15994de4e9e78b8de2"`,
		);
		await queryRunner.query(
			`ALTER TABLE "person_to_film" DROP CONSTRAINT "FK_216ef3ca1f1fd93aa906ccbbedc"`,
		);
		await queryRunner.query(
			`ALTER TABLE "person_to_film" DROP CONSTRAINT "FK_c04a7f782404851e203c4b61495"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_ef4fe5a96b6f83e9472bdaefbc"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_4729d9b8d47986f936cb5e9540"`,
		);
		await queryRunner.query(`DROP TABLE "movies_genres"`);
		await queryRunner.query(`DROP TABLE "movies"`);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_c04a7f782404851e203c4b6149"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_8fc094bc476ffe454d228ed467"`,
		);
		await queryRunner.query(`DROP TABLE "person_to_film"`);
		await queryRunner.query(`DROP TABLE "roles"`);
		await queryRunner.query(`DROP TABLE "persons"`);
		await queryRunner.query(`DROP TABLE "genres"`);
	}
}
