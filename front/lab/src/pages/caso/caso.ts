import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CasoUrgencia } from 'casosUrgencias';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

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
  static readonly ESTADO_ABIERTO = "Nuevo";
  static readonly ESTADO_ACEPTAR = "Aceptado";
  static readonly ESTADO_RECHAZAR = "Cerrado";
  static readonly VISITA_MEDICA = "Visita Médica";
  static readonly VISITA_BREVEDAD = "Visita Brevedad";
  static readonly VISITA_PSIQUIATRIA = "Visita Priquiatria";

  protected caso:CasoUrgencia
  constructor(public navCtrl: NavController, public navParams: NavParams,  
    private view:ViewController, public alertCtrl: AlertController, public launchNavigator:LaunchNavigator) {
      this.caso =navParams.get("caso");
  }

  cerrarModal(){
    this.view.dismiss();
  }

  comoLlegar(){
    //this.abrirMapNavigation({latitud:this.caso.direccion.coordenadas.latitud, longitud:this.caso.direccion.coordenadas.longitud})

    this.launchNavigator.navigate([+this.caso.direccion.coordenadas.latitud, +this.caso.direccion.coordenadas.longitud])
    .then(
      success => console.log('Launched navigator'),
      error => alert('Hubo un error al comenzar la navegación ' +  error)
    );

  }

  cerrarCaso(){
    alert("No implementado!")
  }

  abrirMapNavigation(destino:any){
    window.open("https://www.google.com/maps/dir/?api=1&destination="+destino.latitud+","+destino.longitud+"&travelmode=driving","_blank");
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasoPage');
  }

  abrirMaps(latitud:string, longitud:string){
    window.open("https://www.google.com/maps/search/?api=1&query="+latitud+","+longitud,"_blank");
  }

  mostrarAlertaCoseguro() {
    const alert = this.alertCtrl.create({
      title: 'Pago de Coseguro',
      subTitle: 'Requiere el pago de $' + this.caso.coseguro,
      buttons: ['OK']
    });
    alert.present();
  }

 
}
