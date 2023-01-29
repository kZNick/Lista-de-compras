import * as express from "express"

declare global {
    namespace Express {
        interface Request {
            validateBody:{
                listName: string;
                data:[{
                    name:string,
                    quantity:string
                }]
            }
            listOrder: {
                indexListOrder: number
            }
        }
    }
}