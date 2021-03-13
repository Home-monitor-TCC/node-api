import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Component from "../infra/typeorm/entities/Component";
import TemperatureData from "../infra/typeorm/entities/TemperatureData";
import TemperatureSensor from "../infra/typeorm/entities/TemperatureSensor";
interface ITemperatureData {
  pin: number;
  temperature: number;
}
interface IRequest {
  temperatureDataArray: ITemperatureData[];
  mac_address: string;
}

class RegisterTemperatureService {
  public async execute({
    temperatureDataArray,
    mac_address,
  }: IRequest): Promise<ITemperatureData[]> {
    const componentRepository = getRepository(Component);
    const temperatureDataRepository = getRepository(TemperatureData);
    const temperatureSensorRepository = getRepository(TemperatureSensor);

    var responseData: ITemperatureData[] = [];

    const date = Date.now();
    for (var i = 0; i < temperatureDataArray.length; i++) {
      const { pin } = temperatureDataArray[i];

      const component = await componentRepository.findOne({
        where: {
          pin,
          type: 2,
          board_id: mac_address,
        },
      });

      if (!component) {
        throw new AppError("Componente não encontrado");
      }
    }

    for (var j = 0; j < temperatureDataArray.length; j++) {
      const { pin, temperature } = temperatureDataArray[j];

      const component = await componentRepository.findOne({
        where: {
          pin,
          type: 2,
          board_id: mac_address,
        },
        cache: true,
      });

      const sensor = await temperatureSensorRepository.findOne({
        where: {
          id: component?.id,
        },
      });

      const data = temperatureDataRepository.create({
        sensor_id: sensor?.data_group_id,
        temperature,
      });

      await temperatureDataRepository.save(data);

      responseData.push({
        pin,
        temperature: data.temperature,
      });
    }

    return responseData;
  }
}

export default RegisterTemperatureService;
