import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
} from "express";
import { idsList, orders } from "./dataBase";
import { List, Listrequest, ListrequestKeys } from "./interfaces";

const validateDataOrder = (payload: any): Listrequest => {
  const keys: Array<string> = Object.keys(payload);
  const requiredKeys = ["listName", "data"];

  const containsAllrequired = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!containsAllrequired) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }

  return payload;
};

const creatList = (request: Request, response: Response): Response => {
    console.log(request.validateBody)
  try {
    // const listData: Listrequest = validateDataOrder(request.body);
    const newListData: List = {
      id: idsList.length + 1,
      ...request.validateBody,
    };
    orders.push(newListData);
    idsList.push(idsList.length + 1)
    return response.status(201).json(newListData);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "Internal serve error",
    });
  }
};


const listAll = (request: Request, response: Response): Response => {
  return response.status(200).json(orders);
};

const listId = (request: Request, response: Response): Response => {

    const indexListOrder: number = request.listOrder.indexListOrder

  return response.json(orders[indexListOrder])
};

const deleteList = (request: Request, response: Response): Response =>{

    const indexListOrder: number = request.listOrder.indexListOrder

    orders.splice(indexListOrder,1)

    return response.status(204).send()
    
}
const deleItem = (request: Request, response: Response): Response =>{

    const indexListOrder: number = request.listOrder.indexListOrder

    const nameItem = request.params.name

    const indexItemOrder = orders[indexListOrder].data.findIndex( el => el.name === nameItem)

    if(indexItemOrder === -1){
        return response.status(404).json({
            messge: "List not fouund!"
        })
      }

    orders[indexListOrder].data.splice(indexItemOrder,1)

    return response.status(204).send()
    
}

const upadateList = (request: Request, response: Response): Response =>{

    const indexListOrder: number = request.listOrder.indexListOrder

    const nameItem = request.params.name

    const indexItemOrder = orders[indexListOrder].data.findIndex( el => el.name === nameItem)

    if(indexItemOrder === -1){
        return response.status(404).json({
            messge: "Item not fouund!"
        })
    }
    if(typeof request.body.quantity === "number"){
        return response.status(400).json({
            message: `${request.body.listName} Invalid input value type `,
          });
    }

    orders[indexListOrder].data[indexItemOrder] = {...orders[indexListOrder].data[indexItemOrder], ...request.body}


    return response.json(orders[indexListOrder])

}

export { creatList, listAll,listId, deleteList, upadateList,deleItem };