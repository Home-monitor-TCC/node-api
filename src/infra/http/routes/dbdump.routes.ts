import { Router } from "express";
import DatabaseDumpController from "../controllers/DatabaseDumpController";

const databaseDumpRouter = Router();

const databaseDumpController = new DatabaseDumpController();

databaseDumpRouter.get("/read", databaseDumpController.read);

export default databaseDumpRouter;
