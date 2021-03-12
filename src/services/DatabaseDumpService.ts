import { getRepository, Index } from "typeorm";

import AppError from "../errors/AppError";
import Board from "../infra/typeorm/entities/Board";
import Component from "../infra/typeorm/entities/Component";
import Led from "../infra/typeorm/entities/Led";
import TemperatureSensor from "../infra/typeorm/entities/TemperatureSensor";
import TemperatureDataRepository from "../infra/typeorm/repositories/TemperatureDataRepository";

interface IRequest {
  mac_address: string;
}
interface ILed {
  id: string;
  name: string;
  description: string;
  pin: number;
  type: number;
  state: boolean;
}

interface ITemperatureSensor {
  id: string;
  name: string;
  description: string;
  pin: number;
  type: number;
  lastRecord: {
    temperature: number;
    date: Date | number;
  };
}
interface IResponse {
  leds: ILed[];
  temperatureSensors: ITemperatureSensor[];
}

class DatabaseDumpService {
  public async execute({ mac_address }: IRequest): Promise<IResponse> {
    const boardRepository = getRepository(Board);
    const ledRepository = getRepository(Led);
    const componentRepository = getRepository(Component);
    const temperatureSensorRepository = getRepository(TemperatureSensor);
    const temperatureDataRepository = new TemperatureDataRepository();

    var leds: ILed[] = [];
    var temperatureSensors: ITemperatureSensor[] = [];

    const checkBoard = await boardRepository.findOne({
      where: {
        mac_address: mac_address,
      },
    });

    if (!checkBoard) {
      throw new AppError("Hardware não cadastrado");
    }

    const components = await componentRepository.find({
      where: {
        board_id: mac_address,
      },
    });

    for (let i = 0; i < components.length; i++) {
      if (components[i].type === 1) {
        const ledState = await ledRepository.findOne({
          where: {
            id: components[i].id,
          },
        });

        if (!ledState) {
          throw new AppError("Erro durante o montagem do banco de dados");
        }

        let tmp: ILed = {
          id: components[i].id,
          name: components[i].name,
          description: components[i].description,
          pin: components[i].pin,
          type: components[i].type,
          state: ledState.state,
        };

        leds.push(tmp);
      } else if (components[i].type === 2) {
        const sensor = await temperatureSensorRepository.findOne({
          where: {
            id: components[i].id,
          },
        });

        if (!sensor) {
          throw new AppError("Erro durante o montagem do banco de dados");
        }

        const tempData = await temperatureDataRepository.findLastRecordSensor(
          sensor.data_group_id
        );

        if (!tempData) {
          let tmp: ITemperatureSensor = {
            id: components[i].id,
            name: components[i].name,
            description: components[i].description,
            pin: components[i].pin,
            type: components[i].type,
            lastRecord: {
              temperature: -100,
              date: -100,
            },
          };

          temperatureSensors.push(tmp);
        } else {
          let tmp: ITemperatureSensor = {
            id: components[i].id,
            name: components[i].name,
            description: components[i].description,
            pin: components[i].pin,
            type: components[i].type,
            lastRecord: {
              temperature: tempData.temperature,
              date: tempData.created_at,
            },
          };

          temperatureSensors.push(tmp);
        }
      }
    }

    return { leds, temperatureSensors };
  }
}

export default DatabaseDumpService;
