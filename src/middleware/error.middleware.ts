import { Response, Request, NextFunction } from "express";
import Error from "../interfaces/err.interface";

const errorMiddleware = (
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const status = err.status || 500;
    const message = err.message || 'something went wrong'
    res.status(status).json({status,message})
}

export default errorMiddleware