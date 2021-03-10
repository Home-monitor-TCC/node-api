import "../typeorm";

import express from "express";

const app = express();

const port = 2233;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
