import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import CreateComponentService from "../../../services/CreateComponentService";
import RemoveComponentService from "../../../services/RemoveComponentService";

export default class ComponentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, pin, board_mac_address, type } = request.body;

    const createComponent = new CreateComponentService();
    const component = await createComponent.execute({
      name,
      description,
      pin,
      board_mac_address,
      type,
    });

    return response.json(classToClass(component));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      description,
      pin,
      board_mac_address,
      type,
    } = request.body;

    const removeComponent = new RemoveComponentService();
    const component = await removeComponent.execute({
      id,
      name,
      description,
      pin,
      board_mac_address,
      type,
    });

    return response.json(classToClass(component));
  }
}
