import { Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RequestExpress } from "../utils/types.js";

export const healthCheck = asyncHandler(
  (req: RequestExpress, res: Response) => {
    res.status(200).json(new ApiResponse(200, "Success, It is working!"));
  }
);
