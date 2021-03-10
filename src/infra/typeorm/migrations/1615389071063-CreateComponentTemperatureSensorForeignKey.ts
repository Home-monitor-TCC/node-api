import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateComponentTemperatureSensorForeignKey1615389071063
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "temperature_sensor",
      new TableForeignKey({
        name: "ComponentTemperatureSensor",
        columnNames: ["id"],
        referencedColumnNames: ["id"],
        referencedTableName: "component",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "temperature_sensor",
      "ComponentTemperatureSensor"
    );
  }
}
