import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import TurnOnLedService from "../../../services/TurnOnLedService";
import TurnOffLedService from "../../../services/TurnOffLedService";

export default class LedController {
  public async turnOn(request: Request, response: Response): Promise<Response> {
    const { id, mac_address } = request.body;

    const turnOnLedService = new TurnOnLedService();
    const led = await turnOnLedService.execute({
      id,
      mac_address,
    });

    return response.json(classToClass(led));
  }

  public async turnOff(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, mac_address } = request.body;

    const turnOffLedService = new TurnOffLedService();
    const led = await turnOffLedService.execute({
      id,
      mac_address,
    });

    return response.json(classToClass(led));
  }
}
