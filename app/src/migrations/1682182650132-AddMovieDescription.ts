import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddMovieDescription1682182650132 implements MigrationInterface {
    name = 'AddMovieDescription1682182650132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar
            )
        `)
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title")
            SELECT "id",
                "title"
            FROM "movie"
        `)
        await queryRunner.query(`
            DROP TABLE "movie"
        `)
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `)
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL
            )
        `)
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title")
            SELECT "id",
                "title"
            FROM "temporary_movie"
        `)
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `)
    }
}
