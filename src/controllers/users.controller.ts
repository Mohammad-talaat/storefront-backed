import { Request,Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import jwt from 'jsonwebtoken'
import config from "../config";

const userModel = new UserModel()
//----------------------- create user function ---------------------------------------------- //
export const create = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = await userModel.createUser(req.body)
        res.json({
            status:'success',
            data:{...user},
            message:'User is created successfully!'
        })
    } catch (error) {
        next(error)
    }
}
//----------------------- update user function ---------------------------------------------- //

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await userModel.updateUser(req.body)
      res.json({
        status: 'success',
        data: user,
        message: 'User updated successfully',
      })
    } catch (err) {
      next(err)
    }
  }
//----------------------- get user function ------------------------------------------------- //

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await userModel.getUser(req.params.id as unknown as string)
      res.json({
        status: 'success',
        data: user,
        message: 'User retrieved successfully',
      })
    } catch (err) {
      next(err)
    }
  }
//----------------------- get all users function -------------------------------------------- //
export const getAllUsers = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await userModel.getAllUsers()
      res.json({
        status: 'success',
        data: users,
        message: 'Users retrieved successfully',
      })
    } catch (err) {
      next(err)
    }
  }
//----------------------- delete user function ---------------------------------------------- //
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await userModel.deleteUser(req.params.id as unknown as string)
      res.json({
        status: 'success',
        data: user,
        message: 'User deleted successfully',
      })
    } catch (err) {
      next(err)
    }
  }
  
//----------------------- authenticate user function ---------------------------------------- //


export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body
  
      const user = await userModel.authenticateUser(email, password)
      const token = jwt.sign({ user }, config.jwtToken as unknown as string)
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'the username and password do not match please try again',
        })
      }
      return res.json({
        status: 'success',
        data: { ...user, token },
        message: 'user authenticated successfully',
      })
    } catch (err) {
      return next(err)
    }
}
  