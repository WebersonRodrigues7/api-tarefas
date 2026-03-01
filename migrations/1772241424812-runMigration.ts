import { MigrationInterface, QueryRunner } from "typeorm";

export class RunMigration1772241424812 implements MigrationInterface {
    name = 'RunMigration1772241424812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tarefas\` ADD \`active\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tarefas\` DROP COLUMN \`active\``);
    }

}
