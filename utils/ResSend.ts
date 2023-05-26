import { Response } from "express"

export const ResSend = (res: Response, status: number, msg: string) => {
  res.status(status).send({ code: status, msg: msg });
}