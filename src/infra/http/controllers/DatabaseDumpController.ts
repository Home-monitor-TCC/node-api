import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import DatabaseDumpService from "../../../services/DatabaseDumpService";

export default class DatabaseDumpController {
  public async read(request: Request, response: Response): Promise<Response> {
    const { mac_address } = request.body;
    
    console.log("criou as vasdadsasdasdasdasdariavel");
    const databaseDumpService = new DatabaseDumpService();
    const db = await databaseDumpService.execute({
        mac_address,
    });

    return response.json(classToClass(db));
  }
}