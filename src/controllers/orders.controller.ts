import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import OrderModel from '../models/orders.model';
import config from '../config'

const orderModel = new OrderModel();

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const order = await orderModel.createOrder(req.body)
      res.json({
        status: 'success',
        data: { ...order },
        message: 'order created successfully',
      })
    } catch (err) {
      next(err)
    }
  }