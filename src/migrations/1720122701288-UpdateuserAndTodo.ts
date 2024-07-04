import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateuserAndTodo1720122701288 implements MigrationInterface {
    name = 'UpdateuserAndTodo1720122701288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`created_at\` datetime NOT NULL`);
    }

}
