import {BehaviorSubject} from 'rxjs/BehaviorSubject';
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
  public notificacionesNoLeidas:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private storage:Storage, public eventService:EventosProvider) {
    console.log('Hello StorageServiceProvider Provider');
  }

  public setup(){
    //Inicializo el array de notificaciones a usuario
    this.storage.get(StorageServiceProvider.NOTIFICACIONES_KEY).then((array:NotificacionOsde[])=>{
      console.log("Comienza el setup del storage de notificaciones");
      if(array == null){
        array = new Array()
      }
      console.log("Se encontraron " + array.length + " notificaciones en storage")
      array = this.descartarNotificacionesExpiradas(array)
      this.actualizarCantidadNotificacionesNoLeidas(array);
      this.storage.set(StorageServiceProvider.NOTIFICACIONES_KEY, array)
      console.log("Se inicializó el array de notificaciones en storage")
    });
   }

  public registrarNotificacion(fcmData: any): any {
    //armo el objeto notificacion con la info del mensaje
    let notificacionOsde:NotificacionOsde = fcmData.additionalData;
    notificacionOsde.titulo = fcmData.title,
    notificacionOsde.mensaje = fcmData.message,
    notificacionOsde.leido = 0;
    notificacionOsde.fechaNotificacion = new Date();
     
    this.storage.get(StorageServiceProvider.NOTIFICACIONES_KEY).then((notificacionesArray:NotificacionOsde[])=>{
      //verifico si la notificacion no fue procesada, ver: https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/PAYLOAD.md#use-of-content_available-true
      let buscado= notificacionesArray.find(x => x.notId == notificacionOsde.notId)
      if(buscado != undefined){
        console.log(this.constructor.name + " Se descarta la notificacion, " + buscado.notId + " ya se encuentra en la lista")
        return
      }
      //agrego el mensaje al storage
      notificacionesArray.push(notificacionOsde)
      this.storage.set(StorageServiceProvider.NOTIFICACIONES_KEY, notificacionesArray)
      //actualizo la cantidad de notificaciones para el badge de novedades
      this.actualizarCantidadNotificacionesNoLeidas(notificacionesArray)
      console.log("se guardó en el storage: " +  notificacionOsde.titulo )
      console.log("el array ahora pesa: " + notificacionesArray.length)
      //publico evento de actualizacion de notificaciones
      this.eventService.publicarEventoActualizacionNotificaciones();
    })
  }

  public getNotificaciones():Promise<any>{
    return this.storage.get(StorageServiceProvider.NOTIFICACIONES_KEY);
  }

  public borrarNotificacion(notificacion:NotificacionOsde){
    this.getNotificaciones().then((notificacionesArray:NotificacionOsde[])=>{
      let nuevoArray:NotificacionOsde[] = notificacionesArray.filter(x => x.notId != notificacion.notId)
      if(nuevoArray.length !== notificacionesArray.length){
        this.storage.set(StorageServiceProvider.NOTIFICACIONES_KEY, nuevoArray)
        this.actualizarCantidadNotificacionesNoLeidas(nuevoArray)
        this.eventService.publicarEventoActualizacionNotificaciones();
        console.log(this.constructor.name + ": se eliminó a notificación " +  notificacion.notId)
      }else{
        console.log(this.constructor.name + ": lógica de eliminación incorrecta, no se encuentra la notificación " +  notificacion.notId)
      }
      
    });

  }

  private actualizarCantidadNotificacionesNoLeidas(notificacionesArray:NotificacionOsde[]){
    let cantidad:number = notificacionesArray.filter(x=> x.leido == 0).length
    this.notificacionesNoLeidas.next(cantidad);
    console.log("Se actualizó la variable cantidadNotificacionesNoLeidas: " + this.notificacionesNoLeidas)
  }

  public marcarNotificacionesComoLeidas(){
    this.getNotificaciones().then((notificacionesArray:NotificacionOsde[])=>{
      console.log(this.constructor.name + " se marcarán " + notificacionesArray.length + " notificaciones como leídas")
      notificacionesArray.forEach(x => x.leido=1)
      this.storage.set(StorageServiceProvider.NOTIFICACIONES_KEY, notificacionesArray)
      this.actualizarCantidadNotificacionesNoLeidas(notificacionesArray)
    });
  }

  public getNotificacion(notId:number):Promise<NotificacionOsde>{
    return new Promise((resolve, reject) => {
      console.log(this.constructor.name + " getNotificacion; " + notId)
      this.getNotificaciones().then((notificaciones:NotificacionOsde[])=>{
        let buscado =  notificaciones.find(x => x.notId == notId)
        if(buscado == undefined){
          console.error(this.constructor.name + " no se encuentra la notificacion " + notId)
          reject(new Error("No se encuentra la notificación en el dispositivo!"));
        }else{
          console.log(this.constructor.name + " se encontró la notificación " + notId)
          resolve(buscado);
        }
      })
  });
    
  }

  //comentado hasta que funcione!
  private descartarNotificacionesExpiradas(notificaciones:NotificacionOsde[]){
/*    let lenghtAntesProcesamiento:number = notificaciones.length;
    notificaciones.filter(notificacion => {
      let horaEliminacion = +notificacion.fechaNotificacion.getTime() + (notificacion.ttl + 60 *1000);
      console.log("comparando " + new Date().getTime() + " con " + horaEliminacion);
      new Date().getTime()  <  horaEliminacion
    } )
    console.log("descartarNotificacionesExpiradas: " + (lenghtAntesProcesamiento - notificaciones.length) + " notificaciones filtradas");
 */   return notificaciones;
  }

}
