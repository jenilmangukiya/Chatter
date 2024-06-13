import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RequestExpress } from "../utils/types.js";

export const verifyJWT = asyncHandler(
  async (req: RequestExpress, res: Response, next: NextFunction) => {
    try {
      const accessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!accessToken) {
        throw new ApiError(401, "Unauthorized request");
      }

      const decodedToken: any = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as jwt.Secret
      );

      const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convert to seconds

      if (decodedToken?.exp < currentTimeInSeconds) {
        throw new ApiError(401, "Access Token is expired");
      }

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(401, "Invalid Access token");
      }

      req.user = user;
      next();
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid access Token");
    }
  }
);

export const socketAuthenticator = async (socket: any, next: any) => {
  try {
    const authToken = socket.handshake.auth.token;

    if (!authToken)
      return next(new ApiError(401, "Please login to access this route"));

    const decodedData: any = await jwt.verify(
      authToken,
      process.env.ACCESS_TOKEN_SECRET as jwt.Secret
    );

    if (!decodedData)
      return next(new ApiError(401, "Please login to access this route"));

    const user = await User.findById(decodedData._id);

    if (!user)
      return next(new ApiError(401, "Please login to access this route"));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ApiError(401, "Please login to access this route"));
  }
};
