import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1581419317250 implements MigrationInterface {
	name = 'Init1581419317250'

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "feedbackId" uuid NOT NULL, "author" character varying NOT NULL, "body" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
			undefined,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_3fde0bdad3c76e0006bd84b1ec" ON "comment" ("feedbackId") `,
			undefined,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_d5b5ce13b7dc246707937a9ced" ON "comment" ("author") `,
			undefined,
		)
		await queryRunner.query(
			`CREATE TABLE "feedback" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "author" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "rating" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`,
			undefined,
		)
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_3fde0bdad3c76e0006bd84b1ec3" FOREIGN KEY ("feedbackId") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
			undefined,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_3fde0bdad3c76e0006bd84b1ec3"`,
			undefined,
		)
		await queryRunner.query(`DROP TABLE "feedback"`, undefined)
		await queryRunner.query(
			`DROP INDEX "IDX_d5b5ce13b7dc246707937a9ced"`,
			undefined,
		)
		await queryRunner.query(
			`DROP INDEX "IDX_3fde0bdad3c76e0006bd84b1ec"`,
			undefined,
		)
		await queryRunner.query(`DROP TABLE "comment"`, undefined)
	}
}
