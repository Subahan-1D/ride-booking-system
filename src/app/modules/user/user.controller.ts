/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

// import AppError from "../../errorHelpers/AppError";

// const createUser =  async (req: Request, res: Response, next: NextFunction) => {

//     // throw new AppError(httpStatus.BAD_REQUEST, "fake error for testing ");
//     const user = await UserService.createUser(req.body);
//     res.status(httpStatus.CREATED).json({
//       message: "User created successfully",
//       data: user,
//     });
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: user,
    });
  }
);
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const payload = req.body;
    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;
    const user = await UserService.updateUser(userId, payload, verifiedToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Users retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  updateUser,
};
