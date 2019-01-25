import { Request, Response } from "express";
import { Caso } from "../entities/caso";
import { Direccion } from "../entities/direccion";
import { Result } from "../entities/result";
import * as fs from "fs";


export class CasoController{

    public get(req: Request, res: Response) {
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
*/      const path = require("path");
        console.log(path.resolve("../back/src/data/users.json"));
        var obj = JSON.parse(fs.readFileSync(path.resolve("../back/src/data/users.json"), 'utf8'));
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(obj));
        
      }
}

export const casoController = new CasoController();