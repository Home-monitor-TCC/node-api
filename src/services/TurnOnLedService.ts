import Led from "../infra/typeorm/entities/Led";
import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import Board from "../infra/typeorm/entities/Board";

interface IRequest {
  id: string;
  mac_address: string;
}

class TurnOnLedService {
  public async execute({ mac_address, id }: IRequest): Promise<Led> {
    const boardRepository = getRepository(Board);
    const ledRepository = getRepository(Led);

    const checkBoard = await boardRepository.findOne({
      where: {
        mac_address,
      },
    });

    if (!checkBoard) {
      throw new AppError("Hardware não cadastrado");
    }

    const led = await ledRepository.findOne({
      where: {
        id,
      },
    });

    if (!led) {
      throw new AppError("Led não cadastrado");
    }

    led.state = true;

    return await ledRepository.save({
      id: led.id,
      state: true,
    });
  }
}

export default TurnOnLedService;
