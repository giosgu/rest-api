import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { NotificacionesServiceProvider } from '../../providers/notificaciones-service/notificaciones-service';
import { Notificacion } from 'notificaciones';
import { Observable } from 'rxjs/Observable';
import { NotificacionOsde } from 'notificacionOsde';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { EventosProvider } from '../../providers/eventos/eventos';
import { ChangeDetectorRef } from "@angular/core";
import { NotificacionPage } from '../notificacion/notificacion';

/**
 * Generated class for the NotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage implements OnInit {

  private notificaciones:NotificacionOsde[];
  private static readonly CIERRE_CASO = "CIERRE_CASO"

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage:StorageServiceProvider, public eventCtrl: Events, public changeDetector: ChangeDetectorRef) {
      this.obtenerNotificaciones()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
    
  }
  
  ngOnInit(){
    //suscribo al evento de actualizacion de notificaciones, para actualizar la lista
    this.eventCtrl.subscribe(EventosProvider.EVENTO_NOTIFICACIONES_ACTUALIZACION, () => {
      console.log(this.constructor.name + " se recibe evento " + EventosProvider.EVENTO_NOTIFICACIONES_ACTUALIZACION);
      this.obtenerNotificaciones();
    });
    console.log(this.constructor.name + ": suscripto a evento " + EventosProvider.EVENTO_NOTIFICACIONES_ACTUALIZACION )
  }

  ngOnDestroy() {
    this.eventCtrl.unsubscribe(EventosProvider.EVENTO_NOTIFICACIONES_ACTUALIZACION);
    console.log(this.constructor.name + ": desuscripto a evento " + EventosProvider.EVENTO_NOTIFICACIONES_ACTUALIZACION )
  }


  private obtenerNotificaciones():void{
    this.storage.getNotificaciones().then((notificacionesArray:NotificacionOsde[])=>{
        this.notificaciones = notificacionesArray
        this.changeDetector.detectChanges();
        this.storage.marcarNotificacionesComoLeidas();
    });    
  }

  public eliminarNotificacion(notificacionOsde:NotificacionOsde){
    this.storage.borrarNotificacion(notificacionOsde);
  }

  mostrarNotificacion($event, notificacionOsde:NotificacionOsde){
    console.log("click para mostrar la notificación: " + notificacionOsde.notId)
    this.navCtrl.push(NotificacionPage, {
      notificacionOsde: notificacionOsde
    });
   
  }    

}
