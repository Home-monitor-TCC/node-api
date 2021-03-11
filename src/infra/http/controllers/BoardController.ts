import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import RegisterBoardService from "../../../services/RegisterBoardService";

export default class BoardController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { mac_address } = request.body;

    const registerBoard = new RegisterBoardService();
    const board = await registerBoard.execute({
      mac_address,
    });

    return response.json(classToClass(board));
  }
}
