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

  //Este evento hay que dispararlo cuando se actualiza el array de casos
  public static EVENTO_CASOS_ACTUALIZACION:string = 'casos:actualizacion';
  //Este evento se dispara cuando se actualiza el storage de notificaciones
  public static EVENTO_NOTIFICACIONES_ACTUALIZACION:string = 'notificaciones:actualizacion'

  constructor(public http: HttpClient, public events: Events) {
    console.log('Hello EventosProvider Provider');
  }

  public publicarEventoActualizacionCasos(casos:CasoUrgencia[]){
    this.events.publish(EventosProvider.EVENTO_CASOS_ACTUALIZACION, casos, Date.now());
    console.log("Publicado evento: " + EventosProvider.EVENTO_CASOS_ACTUALIZACION)
  }

  public publicarEventoActualizacionNotificaciones(){
    this.events.publish(EventosProvider.EVENTO_NOTIFICACIONES_ACTUALIZACION);
    console.log(this.constructor.name + " Publicado evento: " + EventosProvider.EVENTO_NOTIFICACIONES_ACTUALIZACION)
  }

}
