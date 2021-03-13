import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import RegisterTemperatureService from "../../../services/RegisterTemperatureService";

export default class TemperatureController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { temperatureDataArray, mac_address } = request.body;

    const registerTemperature = new RegisterTemperatureService();
    const data = await registerTemperature.execute({
      temperatureDataArray,
      mac_address,
    });

    return response.json(classToClass(data));
  }
}
