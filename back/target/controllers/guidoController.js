"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GuidoController {
    post(req, res) {
        console.log("/guido post: " + req.body);
        const object = req.body;
        res.send(object.username + ' ' + object.token + ' ' + object.id);
    }
    root(req, res) {
        res.status(200).send({
            message: "GET request successful using controller!!"
        });
    }
}
exports.GuidoController = GuidoController;
exports.guidoController = new GuidoController();
