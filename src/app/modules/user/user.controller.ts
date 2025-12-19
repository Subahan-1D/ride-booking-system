import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      data: user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    next(err);
   
  }
};

export const UserController = {
  createUser,
};
