import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateComponentTable1615386926006
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "component",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "pin",
            type: "integer",
          },
          {
            name: "board_id",
            type: "varchar",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "type",
            type: "integer",
          },
          {
            name: "description",
            type: "varchar",
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
    await queryRunner.dropTable("component");
  }
}
