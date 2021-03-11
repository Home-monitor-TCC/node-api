import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import Board from "../infra/typeorm/entities/Board";

interface IRequest {
  mac_address: string;
}

class RegisterBoardService {
  public async execute({ mac_address }: IRequest): Promise<Board> {
    const boardRepository = getRepository(Board);

    const macAddressPattern = /([0-9A-F]{2}[:-]){5}([0-9A-F]{2})/;

    if (!mac_address.match(macAddressPattern)) {
      throw new AppError("Mac Address Invalido");
    }

    const checkBoard = await boardRepository.findOne({
      where: {
        mac_address,
      },
    });

    if (checkBoard) {
      throw new AppError("Hardware já cadastrado");
    }

    const board = boardRepository.create({
      mac_address,
    });

    await boardRepository.save(board);

    return board;
  }
}

export default RegisterBoardService;
