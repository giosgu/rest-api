import { Injectable } from '@angular/core';
import { NotificacionOsde } from 'notificacionOsde';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {

  constructor(private storage:Storage) {
    console.log('Hello StorageServiceProvider Provider');
  }

  public setup(){
    //Inicializo el array de notificaciones a usuario
    this.storage.get("NOTIFICACIONES").then((array:NotificacionOsde[])=>{
      console.log("Comienza el setup del storage de notificaciones");
      if(array != null){
        console.log("Se encontraron " + array.length + " notificaciones en storage")
      }else{
        this.storage.set("NOTIFICACIONES", new Array())
        console.log("Se inicializó el array de notificaciones en storage")
      }
    });
   }

  public registrarNotificacion(fcmData: any): any {
    let notificacionOsde:NotificacionOsde = fcmData.additionalData;
    notificacionOsde.titulo = fcmData.title,
    notificacionOsde.mensaje = fcmData.message,
    notificacionOsde.leido = 0;
     
    this.storage.get("NOTIFICACIONES").then((notificacionesArray:NotificacionOsde[])=>{
      console.log("el array de notificaciones actual pesa: " + notificacionesArray.length)
      notificacionesArray.push(notificacionOsde)
      console.log("el array ahora pesa: " + notificacionesArray.length)
      this.storage.set("NOTIFICACIONES", notificacionesArray)
      console.log("se guardó en el storage: " +  notificacionOsde )
    })
  }

  public getNotificaciones():Promise<any>{
    return this.storage.get("NOTIFICACIONES");
  }


}
