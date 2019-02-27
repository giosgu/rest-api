import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificacionOsde } from 'notificacionOsde';

/**
 * Generated class for the NotificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificacion',
  templateUrl: 'notificacion.html',
})
export class NotificacionPage {

  private notificacionOsde:NotificacionOsde;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notificacionOsde =navParams.get("notificacionOsde");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionPage');
  }

}
