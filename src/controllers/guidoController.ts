import { Request, Response } from "express";


export class GuidoController {
    public post(req: Request, res: Response): any {
        console.log("/guido post: " + req.body);
        const object = req.body;
        res.send(object.username + ' ' + object.token + ' ' + object.id);
    }
   
    public root(req: Request, res: Response) {
        res.status(200).send({
          message: "GET request successful using controller!!"
        });
      }
    }

   export const guidoController = new GuidoController();
