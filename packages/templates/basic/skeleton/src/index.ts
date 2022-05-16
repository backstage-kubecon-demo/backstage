import express, { Router } from "express";

const testRouter = Router();
const app = express();

testRouter.get("/", (_, res) =>
  res.json({ hello: "Welcome to ${{ values.name }}" })
);

app.use(testRouter);

app.listen(80);
