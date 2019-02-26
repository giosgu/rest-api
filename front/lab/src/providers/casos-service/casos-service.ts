import { Injectable } from '@angular/core';
import { HttpHelperProvider } from '../http-helper/http-helper';
import { CasoUrgencia } from 'casosUrgencias';

/*
  Generated class for the CasosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CasosServiceProvider {

  constructor(private helper: HttpHelperProvider) {
    
  }

  getCasos(){
    return this.helper.resolveGetUrl("/casos");
  }

  getCaso(numeroCaso:string){
    return this.helper.resolveGetUrl("/caso/"+numeroCaso);
  }

  public filtrarCasos(casos:CasoUrgencia[], estado:string){
    let casosFiltrados :CasoUrgencia[] = []
    for (let caso of casos) {
        if(caso.estado === estado){
            casosFiltrados.push(caso);
        }
    }
    return casosFiltrados;
  }

}
