import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CasosAbiertosPage} from '../casos/casosAbiertos';
import {CasosPage} from '../casos/casos';
import {CasosPendientesPage} from '../casos/casosPendientes';
import {CasosServiceProvider} from '../../providers/casos-service/casos-service';

/**
 * Generated class for the TabCasosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-casos',
  templateUrl: 'tab-casos.html',
})
export class TabCasosPage {

  casos;
  parametro :any;
  tab1Root :any;
  tab2Root :any = CasosPendientesPage;
  tab3Root :any = CasosPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public casosService: CasosServiceProvider) {
    this.obtenerCasos().subscribe(
      (data) => { // Success
        this.casos = data['results'];
        this.parametro = data['results'];
        this.tab1Root = CasosAbiertosPage;
        alert("tab-casos data success")
      },
      (error) =>{
        alert("error en getCasos " + error);
      }
    )
  
  }

  ionViewDidLoad(){
   }

   protected obtenerCasos() {
    return this.casosService.getCasos()
    
  }
}
