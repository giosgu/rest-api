import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  tab1Root :any = CasosPage;
  tab2Root :any = CasosPendientesPage;
  tab3Root :any = CasosAbiertosPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public casosService: CasosServiceProvider, public loadingCtrl: LoadingController) {
      this.casos = this.navParams.get("casos");
   
  }

}
