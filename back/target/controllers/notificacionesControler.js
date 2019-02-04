"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class NotificacionesController {
    get(req, res) {
        console.log("/Notificaciones: Get " + new Date());
        const path = require("path");
        var obj = JSON.parse(fs.readFileSync(path.resolve("../back/src/data/notificaciones.json"), 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(obj));
    }
}
exports.NotificacionesController = NotificacionesController;
exports.notificacionesController = new NotificacionesController();
