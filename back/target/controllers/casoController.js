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
        console.log("/Casos : Get");
        /*
                let direccion1 : Direccion = new Direccion("321321321", "32321321", "Bulnes", "3727")
                let caso1 : Caso = new Caso("Dolor de cabeza", "61205254", direccion1);
        
                let direccion2 : Direccion = new Direccion("321321321", "32321321", "Córdoba", "3727")
                let caso2 : Caso = new Caso("Dolor de cabeza", "6012458721", direccion2);
        
                let casos : Array<Caso> = new Array;
                casos.push(caso1)
                casos.push(caso2)
                let result: Result = new Result(casos);
        */ const path = require("path");
        console.log(path.resolve("../back/src/data/users.json"));
        var obj = JSON.parse(fs.readFileSync(path.resolve("../back/src/data/users.json"), 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(obj));
    }
}
exports.CasoController = CasoController;
exports.casoController = new CasoController();
