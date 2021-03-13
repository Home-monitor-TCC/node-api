import { getRepository } from "typeorm";

import Led from "../infra/typeorm/entities/Led";
import AppError from "../errors/AppError";
import Board from "../infra/typeorm/entities/Board";
import Component from "../infra/typeorm/entities/Component";
interface IRequest {
  pin: number;
  mac_address: string;
}

class TurnOnLedService {
  public async execute({ mac_address, pin }: IRequest): Promise<Led> {
    const boardRepository = getRepository(Board);
    const componentRepository = getRepository(Component);
    const ledRepository = getRepository(Led);

    const checkBoard = await boardRepository.findOne({
      where: {
        mac_address,
      },
    });

    if (!checkBoard) {
      throw new AppError("Hardware não cadastrado");
    }

    const component = await componentRepository.findOne({
      where: {
        pin,
        board_id: mac_address,
        type: 1,
      },
    });

    if (!component) {
      throw new AppError("Led não cadastrado");
    }

    return await ledRepository.save({
      id: component.id,
      state: true,
    });
  }
}

export default TurnOnLedService;
