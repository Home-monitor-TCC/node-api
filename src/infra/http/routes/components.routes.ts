import { Router } from "express";
import ComponentController from "../controllers/ComponentController";

const componentRouter = Router();

const componentController = new ComponentController();

componentRouter.post("/create", componentController.create);
componentRouter.delete("/remove", componentController.remove);
componentRouter.patch("/edit", componentController.edit);

export default componentRouter;
