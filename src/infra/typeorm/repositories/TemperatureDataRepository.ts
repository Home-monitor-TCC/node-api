import { getRepository, Repository } from "typeorm";
import TemperatureData from "../entities/TemperatureData";

export default class TemperatureDataRepository {
  private ormRepository: Repository<TemperatureData>;

  constructor() {
    this.ormRepository = getRepository(TemperatureData);
  }

  public async findLastRecordSensor(data_group_id: string) {
    const temp = await this.ormRepository.findOne({
      where: {
        sensor_id: data_group_id,
      },
      order: {
        temperature: "DESC",
      },
    });

    return temp;
  }
}
