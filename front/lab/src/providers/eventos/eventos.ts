import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CasoUrgencia } from 'casosUrgencias';
import { Events } from 'ionic-angular';

/*
  Generated class for the EventosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventosProvider {

  constructor(public http: HttpClient, public events: Events) {
    console.log('Hello EventosProvider Provider');
  }

  public publicarEventoActualizacionCasos(casos:CasoUrgencia[]){
    this.events.publish('casos:actualizacion', casos, Date.now());
    console.log("Publicado evento: 'casos:actualizacion'")
  }

}
