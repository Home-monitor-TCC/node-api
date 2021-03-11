import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import "../typeorm";
import AppError from "../../errors/AppError";
import boardRouter from "./routes/board.routes";
import componentRouter from "./routes/components.routes";

const port = 2233;

const app = express();
app.use(express.json());

app.use("/board", boardRouter);
app.use("/component", componentRouter);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
