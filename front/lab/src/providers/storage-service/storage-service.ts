import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';
import { NotificacionOsde } from 'notificacionOsde';
import { EventosProvider } from '../eventos/eventos';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider  {

  private static NOTIFICACIONES_KEY:string = "NOTIFICACIONES"
  constructor(private storage:Storage, public eventService:EventosProvider) {
    console.log('Hello StorageServiceProvider Provider');
  }

  public setup(){
    //Inicializo el array de notificaciones a usuario
    this.storage.get(StorageServiceProvider.NOTIFICACIONES_KEY).then((array:NotificacionOsde[])=>{
      console.log("Comienza el setup del storage de notificaciones");
      if(array != null){
        console.log("Se encontraron " + array.length + " notificaciones en storage")
      }else{
        this.storage.set(StorageServiceProvider.NOTIFICACIONES_KEY, new Array())
        console.log("Se inicializó el array de notificaciones en storage")
      }
    });
   }

  public registrarNotificacion(fcmData: any): any {
    //armo el objeto notificacion con la info del mensaje
    let notificacionOsde:NotificacionOsde = fcmData.additionalData;
    notificacionOsde.titulo = fcmData.title,
    notificacionOsde.mensaje = fcmData.message,
    notificacionOsde.leido = 0;
     
    this.storage.get(StorageServiceProvider.NOTIFICACIONES_KEY).then((notificacionesArray:NotificacionOsde[])=>{
      //verifico si la notificacion no fue procesada, ver: https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/PAYLOAD.md#use-of-content_available-true
      let buscado= notificacionesArray.find(x => x.uniqueId == notificacionOsde.uniqueId)
      if(buscado != undefined){
        console.log(this.constructor.name + " Se descarta la notificacion, " + buscado.uniqueId + " ya se encuentra en la lista")
        return
      }
      //agrego el mensaje al storage
      notificacionesArray.push(notificacionOsde)
      this.storage.set(StorageServiceProvider.NOTIFICACIONES_KEY, notificacionesArray)
      console.log("se guardó en el storage: " +  notificacionOsde.titulo )
      console.log("el array ahora pesa: " + notificacionesArray.length)
      //publico evento de actualizacion de notificaciones
      this.eventService.publicarEventoActualizacionNotificaciones();
    })
  }

  public getNotificaciones():Promise<any>{
    return this.storage.get("NOTIFICACIONES");
  }

  public borrarNotificacion(notificacion:NotificacionOsde){
    this.getNotificaciones().then((notificacionesArray:NotificacionOsde[])=>{
      let nuevoArray:NotificacionOsde[] = notificacionesArray.filter(x => x.uniqueId != notificacion.uniqueId)
      if(nuevoArray.length !== notificacionesArray.length){
        this.storage.set(StorageServiceProvider.NOTIFICACIONES_KEY, nuevoArray)
        this.eventService.publicarEventoActualizacionNotificaciones();
        console.log(this.constructor.name + ": se eliminó a notificación " +  notificacion.uniqueId)
      }else{
        console.log(this.constructor.name + ": lógica de eliminación incorrecta, no se encuentra la notificación " +  notificacion.uniqueId)
      }
      
    });

  }

}
