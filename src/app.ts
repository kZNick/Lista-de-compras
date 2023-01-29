import express, { Application, json, Request, Response } from "express";
import { creatList, listAll, listId, deleteList, upadateList, deleItem } from "./logic";
import { checkerIdMiddleware, checkerStringMiddleware, validateBodyMiddleware } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", checkerStringMiddleware, validateBodyMiddleware, creatList);

app.get("/purchaseList", listAll);

app.get("/purchaseList/:id", checkerIdMiddleware, listId);

app.delete("/purchaseList/:id", checkerIdMiddleware, deleteList);

app.delete("/purchaseList/:id/:name", checkerIdMiddleware, deleItem);

app.patch("/purchaseList/:id/:name", checkerIdMiddleware, upadateList);

app.listen(3000, () => {
  console.log("Serve On");
});
