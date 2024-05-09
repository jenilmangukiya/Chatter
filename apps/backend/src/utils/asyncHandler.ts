import { NextFunction, Request, Response } from "express";

const asyncHandler = (requestHandler: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(
      (err) =>
        res.status(err.statusCode || 500).json({
          success: false,
          message: err.message,
        })
      // next(err)
    );
  };
};

export { asyncHandler };
