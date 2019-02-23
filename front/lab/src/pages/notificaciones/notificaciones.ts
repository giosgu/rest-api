import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificacionesServiceProvider } from '../../providers/notificaciones-service/notificaciones-service';
import { Notificacion } from 'notificaciones';
import { Observable } from 'rxjs/Observable';
import { NotificacionOsde } from 'notificacionOsde';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

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
export class NotificacionesPage {

  private notificaciones:NotificacionOsde[];
  private static readonly CIERRE_CASO = "CIERRE_CASO"

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage:StorageServiceProvider) {
      this.obtenerNotificaciones()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }

  private obtenerNotificaciones():void{
    this.storage.getNotificaciones().then((notificacionesArray:NotificacionOsde[])=>{
        this.notificaciones = notificacionesArray
    });    
  }

}
