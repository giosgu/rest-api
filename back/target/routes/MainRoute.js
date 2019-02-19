"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const MainController_1 = require("../controllers/MainController");
const guidoController_1 = require("../controllers/guidoController");
const casoController_1 = require("../controllers/casoController");
const notificacionesControler_1 = require("../controllers/notificacionesControler");
class MainRoutes {
    constructor() {
        this.router = express.Router();
        this.config();
    }
    config() {
        this.router.get("/", (req, res) => MainController_1.mainController.root(req, res));
        this.router.get("/guido", (req, res) => guidoController_1.guidoController.root(req, res));
        this.router.post("/guido", (req, res) => guidoController_1.guidoController.post(req, res));
        this.router.get("/casos", (req, res) => casoController_1.casoController.get(req, res));
        this.router.get("/notificaciones", (req, res) => notificacionesControler_1.notificacionesController.get(req, res));
        this.router.get('/caso/:numeroCaso', function (req, res, next) {
            var numeroCaso = req.params.numeroCaso;
            casoController_1.casoController.getCaso(req, res, numeroCaso);
        });
    }
}
exports.mainRoutes = new MainRoutes().router;
