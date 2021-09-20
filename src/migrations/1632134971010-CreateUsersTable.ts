import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1632134971010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'USERS',
        columns: [
          {
            name: 'USER_ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'NAME',
            type: 'varchar(100)',
          },
          {
            name: 'SURNAME',
            type: 'varchar(100)',
          },
          {
            name: 'ADDRESS',
            type: 'varchar(200)',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('USERS');
  }
}
