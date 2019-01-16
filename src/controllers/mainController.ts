import { Request, Response } from "express";

export class MainController {
  public root(req: Request, res: Response) {
    res.status(200).send({
      message: "GET request successful using controller!!"
    });
  }
}

export const mainController = new MainController();
