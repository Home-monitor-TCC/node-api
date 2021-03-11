import { Router } from "express";

import TemperatureController from "../controllers/TemperatureController";

const temperatureRouter = Router();

const temperatureController = new TemperatureController();

temperatureRouter.post("/create", temperatureController.create);

export default temperatureRouter;
