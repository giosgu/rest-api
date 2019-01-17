import * as express from "express";
import { mainController } from "../controllers/MainController";
import { guidoController } from "../controllers/guidoController";

class MainRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/", (req: express.Request, res: express.Response) =>
      mainController.root(req, res)
    );
    this.router.get("/guido", (req: express.Request, res: express.Response) =>
        guidoController.root(req, res)
    );
    this.router.post("/guido",(req: express.Request, res: express.Response) =>
        guidoController.post(req, res)
    );

  }
}

export const mainRoutes = new MainRoutes().router;