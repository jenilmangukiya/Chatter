import { Request } from "express";

export interface RequestExpress extends Request {
  user: any;
}
