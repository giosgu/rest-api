import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import {CasosAbiertosPage} from '../casos/casosAbiertos';
import {CasosPage} from '../casos/casos';
import {CasosPendientesPage} from '../casos/casosPendientes';
import {CasosServiceProvider} from '../../providers/casos-service/casos-service';
import { MapCasosPage } from '../map-casos/map-casos';
import { CasoUrgencia } from 'casosUrgencias';
import { EventosProvider } from '../../providers/eventos/eventos';

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
export class TabCasosPage implements OnInit {

  casos: CasoUrgencia[] = [];
  tab1Root :any = CasosPage;
  tab2Root :any = CasosPendientesPage;
  tab3Root :any = CasosAbiertosPage;
  tab4Root :any = MapCasosPage;
  cantidadCasosPendientes:number=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public casosService: CasosServiceProvider, public loadingCtrl: LoadingController, 
    public events: Events, public changeDetector: ChangeDetectorRef,) {
      this.casos = this.navParams.get("casos");
      this.cantidadCasosPendientes=this.casosService.filtrarCasos(this.casos, "Nuevo").length;
  }

  ngOnInit() {
    this.events.subscribe(EventosProvider.EVENTO_CASOS_ACTUALIZACION, (casos:CasoUrgencia[], time) => {
      console.log( this.constructor.name + ": evento " + EventosProvider.EVENTO_CASOS_ACTUALIZACION + " recibido. Cantidad de casos: " + casos.length);
      this.casos = casos;
      this.cantidadCasosPendientes=this.casosService.filtrarCasos(this.casos, "Nuevo").length;
      this.changeDetector.detectChanges();
    });
    
  }

  ngOnDestroy() {
    this.events.unsubscribe(EventosProvider.EVENTO_CASOS_ACTUALIZACION);
    console.log(this.constructor.name + ": desuscripto a evento " + EventosProvider.EVENTO_CASOS_ACTUALIZACION)
  }

}
