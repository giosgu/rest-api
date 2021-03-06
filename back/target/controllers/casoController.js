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
class CasoController {
    get(req, res) {
        console.log("/Casos: Get " + new Date());
        const path = require("path");
        var obj = JSON.parse(fs.readFileSync(path.resolve("../back/src/data/casos.json"), 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(obj));
    }
    getCaso(req, res, numeroCaso) {
        console.log(new Date() + " GET /caso/  " + numeroCaso);
        const path = require("path");
        var obj = JSON.parse(fs.readFileSync(path.resolve("../back/src/data/caso.json"), 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(obj));
    }
}
exports.CasoController = CasoController;
exports.casoController = new CasoController();
