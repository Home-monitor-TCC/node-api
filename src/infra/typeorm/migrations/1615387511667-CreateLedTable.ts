import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateLedTable1615387511667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "led",
        columns: [
          {
            name: "id",
            type: "uuid",
          },
          {
            name: "state",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("led");
  }
}
