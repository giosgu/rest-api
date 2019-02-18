import { CasoUrgencia } from "casosUrgencias";

export class CasosUtils {

    //fixme: habría que usar casos.find... 
    public static getCaso(casos:CasoUrgencia[], numeroCaso:string){
        console.log("Ingreso a CasosUtils.getCaso, localizando caso " + numeroCaso)
        let caso:CasoUrgencia;
        casos.forEach(element => {
            console.log("Comparando caso " + element.numero + " vs " + numeroCaso)
            if(element.numero == numeroCaso){
                console.log("Caso encontrado!")
                caso = element;
            }
        });
        return caso
    }

}