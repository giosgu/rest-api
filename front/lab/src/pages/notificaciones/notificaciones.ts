import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificacionesServiceProvider } from '../../providers/notificaciones-service/notificaciones-service';
import { Notificacion } from 'notificaciones';
import { Observable } from 'rxjs/Observable';

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

  private notificaciones:Notificacion[];
  private static readonly CIERRE_CASO = "CIERRE_CASO"

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public notificacionesService:NotificacionesServiceProvider) {
      this.obtenerNotificaciones(notificacionesService)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }

  private obtenerNotificaciones(notificacionesService:NotificacionesServiceProvider):void{
    notificacionesService.getNotificaciones().subscribe(
      (data) => { // Success
        this.notificaciones = data["Notificaciones"]
      },
      (error) =>{
        alert("No se pudieron cargar las notificaciones" + error);
      }
    )    

  }
}
