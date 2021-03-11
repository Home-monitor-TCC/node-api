import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import Board from "../infra/typeorm/entities/Board";
import Component from "../infra/typeorm/entities/Component";
import Led from "../infra/typeorm/entities/Led";
import TemperatureSensor from "../infra/typeorm/entities/TemperatureSensor";

interface IRequest {
  name: string;
  description: string;
  pin: number;
  board_mac_address: string;
  type: number;
}

class CreateComponentService {
  public async execute({
    name,
    description,
    pin,
    board_mac_address,
    type,
  }: IRequest): Promise<Component> {
    const boardRepository = getRepository(Board);
    const componentRepository = getRepository(Component);
    const ledRepository = getRepository(Led);
    const temperatureSensorRepository = getRepository(TemperatureSensor);

    var pinArray = [16, 5, 4, 0, 2, 14, 12, 13, 15, 3, 1];
    var occupiedPinsArray: number[] = [];

    const checkBoard = await boardRepository.findOne({
      where: {
        mac_address: board_mac_address,
      },
    });

    if (!checkBoard) {
      throw new AppError("Hardware não cadastrado");
    }

    const registeredComponents = await componentRepository.find({
      where: {
        board_id: board_mac_address,
      },
    });

    registeredComponents.forEach((comp) => {
      occupiedPinsArray.push(comp.pin);
    });

    if (!pinArray.find((element) => element === pin)) {
      throw new AppError("Pino inválido");
    }

    if (occupiedPinsArray.find((element) => element === pin)) {
      throw new AppError("Pino ocupado");
    }

    const component = componentRepository.create({
      name,
      description,
      pin,
      board_id: board_mac_address,
      type,
    });

    await componentRepository.save(component);

    if (type === 1) {
      const led = ledRepository.create({
        id: component.id,
        state: false,
      });

      await ledRepository.save(led);
    } else if (type === 2) {
      const temperatureSensor = temperatureSensorRepository.create({
        id: component.id,
      });

      await temperatureSensorRepository.save(temperatureSensor);
    }

    return component;
  }
}

export default CreateComponentService;
