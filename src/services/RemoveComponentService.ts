import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import Component from "../infra/typeorm/entities/Component";

interface IRequest {
  id: string;
  name: string;
  description: string;
  pin: number;
  board_mac_address: string;
  type: number;
}

class RemoveComponentService {
  public async execute({
    id,
    name,
    description,
    pin,
    board_mac_address,
    type,
  }: IRequest): Promise<Component> {
    const componentRepository = getRepository(Component);

    const component = await componentRepository.findOne({
      where: {
        id,
      },
    });

    if (!component) {
      throw new AppError("Componente não encontrado");
    }

    await componentRepository.delete(id);

    return component;
  }
}

export default RemoveComponentService;
