"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GuidoController {
    root(req, res) {
        res.status(200).send({
            message: "GET al path /guido!!"
        });
    }
}
exports.GuidoController = GuidoController;
exports.guidoController = new GuidoController();
