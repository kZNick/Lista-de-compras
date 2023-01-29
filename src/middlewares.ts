import express, {Application,json,NextFunction,Request,Response,} from "express";
import { orders } from "./dataBase";
import { ItemRequestKeys, ListrequestKeys } from "./interfaces";



const checkerStringMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
  ): Response | void => {
    if (typeof request.body.listName !== "string") {
      return response.status(400).json({
        message: `${request.body.listName} Invalid input value type `,
      });
    }
  
    return next();
  };

const validateBodyMiddleware = ( request: Request,response: Response,next: NextFunction): Response | void => {

    const keys: Array<string> = Object.keys(request.body)
    const requiredKeys: Array<ListrequestKeys> = ["listName", "data"]
    const requiredData: Array<ItemRequestKeys> = ["name", "quantity"]

    const validateKeys: boolean = requiredKeys.every((key:string)=> keys.includes(key))

    if(!validateKeys){
        return response.status(400).json({message: `Ivalid input expected ${requiredKeys}`})
    }

    // console.log(request.body.data)
    // if(!requiredData.includes(request.body.data)){
    //     return response.status(400).json({message: `Ivalid input expected ${requiredData}`})
    // }
    

    const {listName,data } = request.body

    // const {name, quantity } = request.body.data

    console.log(request.body.data)

    const {name,quantity } = request.body

    console.log(quantity)

    request.validateBody = {
        listName,
        data
    }

    next()
}

const checkerIdMiddleware = ( request: Request,response: Response,next: NextFunction): Response | void => {

    const id: number = parseInt(request.params.id);
    const indexListOrder = orders.findIndex(el=> el.id === id)
  
    if(indexListOrder === -1){
      return response.status(404).json({
          messge: "List not fouund!"
      })
    }

    request.listOrder = {
        indexListOrder: indexListOrder
    }
    return next()
  }
  
export {checkerStringMiddleware,checkerIdMiddleware,validateBodyMiddleware}