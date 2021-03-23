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

class FreePinsService {
  public async execute({ mac_address }: IRequest): Promise<Number[]> {
    const boardRepository = getRepository(Board);
    const componentRepository = getRepository(Component);

    var freePinsArray: Number[];
    var pinsArray = [16, 5, 4, 0, 2, 14, 12, 13, 15, 3, 1];
    var occupiedPins: Number[] = [];

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

    components.forEach((e) => {
      occupiedPins.push(e.pin);
    });

    freePinsArray = pinsArray.filter((e) => {
      if (occupiedPins.indexOf(e) === -1) {
        return true;
      } else {
        return false;
      }
    });

    return freePinsArray;
  }
}

export default FreePinsService;
