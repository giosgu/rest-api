import { Component } from '@angular/core';
import {CasosServiceProvider} from '../../providers/casos-service/casos-service';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {TabCasosPage} from '../tab-casos/tab-casos';
import {CasoUrgencia} from  'casosUrgencias'


/**
 * Generated class for the CargaTabCasosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carga-tab-casos',
  templateUrl: 'carga-tab-casos.html',
})
export class CargaTabCasosPage {

  casos: CasoUrgencia[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      public loadingCtrl: LoadingController, public casosService: CasosServiceProvider) {
    let loader = this.loadingCtrl.create({
      content: 'Obteniendo Casos...',
    });

    loader.present().then(() => {
      this.obtenerCasos().subscribe(
        (data) => { // Success

          this.casos = data['CasoUrgencias'];
          loader.dismiss();
          this.navCtrl.setRoot(TabCasosPage, { 'casos': this.casos })

        },
        (error) =>{
          alert("error en getCasos " + error);
        }
      )
  
    });
  }

  protected obtenerCasos() {
    return this.casosService.getCasos()
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CargaTabCasosPage');
  }

}
