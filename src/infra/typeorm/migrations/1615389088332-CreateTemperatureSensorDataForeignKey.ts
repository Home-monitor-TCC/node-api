import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateTemperatureSensorDataForeignKey1615389088332
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "temperature_data",
      new TableForeignKey({
        name: "TemperatureSensorData",
        columnNames: ["sensor_id"],
        referencedColumnNames: ["data_group_id"],
        referencedTableName: "temperature_sensor",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "temperature_data",
      "TemperatureSensorData"
    );
  }
}
