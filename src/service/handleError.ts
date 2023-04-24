import { Response } from "express";

export const handleError = (
  {
    res, 
    err, 
    msg = '欄位未填寫正確或無此 id！'
  }:
  {
    res: Response,
    err?: Error,
    msg?: string
  }) => {
  let message = msg;
  if (err) {
    message = err.message;
  }
  res.status(400)
    .send({
      status: true,
      message
    }).end();
}
