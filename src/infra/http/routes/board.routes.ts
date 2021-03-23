import { Router } from "express";
import BoardController from "../controllers/BoardController";

const boardRouter = Router();

const boardController = new BoardController();

boardRouter.post("/register", boardController.create);
boardRouter.get("/pins", boardController.pins);

export default boardRouter;
