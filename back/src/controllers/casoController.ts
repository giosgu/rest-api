import { Request, Response } from "express";
import { Caso } from "../entities/caso";
import { Direccion } from "../entities/direccion";
import { Result } from "../entities/result";
import * as fs from "fs";


export class CasoController{

    public get(req: Request, res: Response) {
        console.log("/Casos: Get " + new Date());
        const path = require("path");
        var obj = JSON.parse(fs.readFileSync(path.resolve("../back/src/data/casos.json"), 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(obj));
        
      }

      public getCaso(req: Request, res: Response, numeroCaso:string) {
        console.log(new Date() + " GET /caso/  " + numeroCaso);
        const path = require("path");
        var obj = JSON.parse(fs.readFileSync(path.resolve("../back/src/data/casos.json"), 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(obj));
        
      } 
}

export const casoController = new CasoController();