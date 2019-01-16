import { Request, Response } from "express";

export class GuidoController {
  public root(req: Request, res: Response) {
    res.status(200).send({
      message: "GET al path /guido!!"
    });
  }
}

export const guidoController = new GuidoController();
