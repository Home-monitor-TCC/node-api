import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Component from "../infra/typeorm/entities/Component";
import TemperatureData from "../infra/typeorm/entities/TemperatureData";
import TemperatureSensor from "../infra/typeorm/entities/TemperatureSensor";


interface IRequest {
    id: string,
    temperature: number,
    mac_address: string,
}

class RegisterTemperatureService {
  public async execute({
    id,
    temperature,
    mac_address,
  }: IRequest): Promise<TemperatureData> {
    const componentRepository = getRepository(Component);
    const temperatureDataRepository = getRepository(TemperatureData);
    const temperatureSensorRepository = getRepository(TemperatureSensor);

    const component = await componentRepository.findOne({
      where: {
        id,
        type:2,
        board_id:mac_address
      },
    });

    if (!component) {
      throw new AppError("Componente não encontrado");
    }

    const sensor = await temperatureSensorRepository.findOne({
        where:{
            id:component.id,
        }
    });

    const data = temperatureDataRepository.create({
        sensor_id : sensor?.data_group_id,
        date : Date.now(),
        temperature,
    });
    
    await temperatureSensorRepository.save(data);

    return data;
  }
}

export default RegisterTemperatureService;
