import { Request, Response } from "express";
import * as fs from "fs";


export class NotificacionesController{

    public get(req: Request, res: Response) {
        console.log("/Notificaciones: Get " + new Date());
        const path = require("path");
        var obj = JSON.parse(fs.readFileSync(path.resolve("../back/src/data/notificaciones.json"), 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(obj));
        
      }
}

export const notificacionesController = new NotificacionesController();