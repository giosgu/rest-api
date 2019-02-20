import { CasoUrgencia } from "casosUrgencias";
import { ValueTransformer } from "@angular/compiler/src/util";

export class CasosUtils {

    public static getCaso(casos:CasoUrgencia[], numeroCaso:string){
        console.log("Ingreso a CasosUtils.getCaso, localizando caso " + numeroCaso)
        return casos.find(x => x.numero == numeroCaso)
    }
  
}