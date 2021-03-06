import * as express from "express";
import { mainController } from "../controllers/MainController";
import { guidoController } from "../controllers/guidoController";
import {casoController} from "../controllers/casoController"
import {notificacionesController} from "../controllers/notificacionesControler"

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
    this.router.get("/casos",(req: express.Request, res: express.Response) =>
        casoController.get(req, res)
    );
    this.router.get("/notificaciones",(req: express.Request, res: express.Response) =>
        notificacionesController.get(req,res)
    );
    this.router.get('/caso/:numeroCaso', function (req, res, next) {
      var numeroCaso = req.params.numeroCaso;
        casoController.getCaso(req, res, numeroCaso);
  });
  }
}

export const mainRoutes = new MainRoutes().router;