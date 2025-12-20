import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { UserService } from "./user.service";
// import AppError from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw new AppError(httpStatus.BAD_REQUEST, "fake error for testing ");
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
