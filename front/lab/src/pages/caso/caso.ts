import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CasoUrgencia } from 'casosUrgencias';

/**
 * Generated class for the CasoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-caso',
  templateUrl: 'caso.html',
})
export class CasoPage {
  protected caso:CasoUrgencia
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.caso =navParams.get("caso");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasoPage');
  }

  abrirMaps(latitud:string, longitud:string){
    window.open("https://www.google.com/maps/search/?api=1&query="+latitud+","+longitud,"_blank");
  }

}
