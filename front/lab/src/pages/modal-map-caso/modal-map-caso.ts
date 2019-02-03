import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CasoUrgencia } from 'casosUrgencias';
import { CasoPage } from '../caso/caso';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ModalMapCasoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-map-caso',
  templateUrl: 'modal-map-caso.html',
})
export class ModalMapCasoPage {
  
  private caso:CasoUrgencia;

  constructor(private navParams: NavParams, private view:ViewController) {
    this.caso = navParams.get("caso")
  }

  comoLlegar(){
    this.abrirMapNavigation({latitud:this.caso.direccion.coordenadas.latitud, longitud:this.caso.direccion.coordenadas.longitud})
  }

  abrirMapNavigation(destino:any){
    window.open("https://www.google.com/maps/dir/?api=1&destination="+destino.latitud+","+destino.longitud+"&travelmode=driving","_blank");
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMapCasoPage');
  }

  cerrarModal(){
    this.view.dismiss();
  }
}
