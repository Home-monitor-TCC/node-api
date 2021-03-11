import { Router } from "express";

import LedController from "../controllers/LedController";

const ledRouter = Router();

const ledController = new LedController();

ledRouter.patch("/on", ledController.turnOn);
ledRouter.patch("/off", ledController.turnOff);

export default ledRouter;
