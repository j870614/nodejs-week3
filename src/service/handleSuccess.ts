import { Response } from "express";

export function handleSuccess<T>(res: Response, data: T) {
  res.status(200).json({
    status: true,
    data
  });
}
