import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateComponentLedForeignKey1615389044954
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "led",
      new TableForeignKey({
        name: "ComponentLed",
        columnNames: ["id"],
        referencedColumnNames: ["id"],
        referencedTableName: "component",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("led", "ComponentLed");
  }
}
