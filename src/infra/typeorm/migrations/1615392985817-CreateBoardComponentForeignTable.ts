import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateBoardComponentForeignTable1615392985817
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "component",
      new TableForeignKey({
        name: "BoardComponent",
        columnNames: ["board_id"],
        referencedColumnNames: ["mac_address"],
        referencedTableName: "board",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("component", "BoardComponent");
  }
}
