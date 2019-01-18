"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caso_1 = require("../entities/caso");
const direccion_1 = require("../entities/direccion");
class CasoController {
    get(req, res) {
        console.log("/Casos : Get");
        let direccion1 = new direccion_1.Direccion("321321321", "32321321", "Bulnes", "3727");
        let caso1 = new caso_1.Caso("Dolor de cabeza", "61205254", direccion1);
        let direccion2 = new direccion_1.Direccion("321321321", "32321321", "Córdoba", "3727");
        let caso2 = new caso_1.Caso("Dolor de cabeza", "6012458721", direccion2);
        let casos = new Array;
        casos.push(caso1);
        casos.push(caso2);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(casos));
    }
}
exports.CasoController = CasoController;
exports.casoController = new CasoController();
