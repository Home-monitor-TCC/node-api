import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import Board from "../infra/typeorm/entities/Board";
import Component from "../infra/typeorm/entities/Component";
import Led from "../infra/typeorm/entities/Led";
import TemperatureSensor from "../infra/typeorm/entities/TemperatureSensor";

interface IRequest {
  id: number;
  name: string;
  description: string;
  mac_address: string;
}

class CreateComponentService {
  public async execute({
    id,
    name,
    description,
    mac_address,
  }: IRequest): Promise<Component> {
    const boardRepository = getRepository(Board);
    const componentRepository = getRepository(Component);

    const checkBoard = await boardRepository.findOne({
      where: {
        mac_address: mac_address,
      },
    });

    if (!checkBoard) {
      throw new AppError("Hardware não cadastrado");
    }

    const component = await componentRepository.findOne({
      where: {
        id,
      },
    });

    if (!component) {
      throw new AppError("Componente não encontrado");
    }

    await componentRepository.save({
      id: component.id,
      name,
      description,
    });

    return component;
  }
}

export default CreateComponentService;
