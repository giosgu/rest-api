import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { CasosPage } from '../casos/casos';
import { CasoUrgencia } from 'casosUrgencias';
import { CasosServiceProvider } from '../../providers/casos-service/casos-service';

@Component({
    selector: 'page-casos',
    templateUrl: 'casos.html'
  })
  export class CasosAbiertosPage extends CasosPage {

    titulo:string;

    constructor(public navCtrl: NavController, public navParams: NavParams, 
      public casosService: CasosServiceProvider,public events: Events, 
      public changeDetector: ChangeDetectorRef) {
      super(navCtrl,navParams , casosService, events, changeDetector);
    }

      protected inicializar(casos:any[]){
        this.casos = this.filtrarCasos(casos, "Aceptado")
        this.msgSinCasos = "No posee casos aceptados"
        this.titulo = "Casos Aceptados"
      }

      protected filtrarParaChangeDetector( casos:CasoUrgencia[]):CasoUrgencia[]{
        return this.filtrarCasos(casos, "Aceptado")
      }
    
    }


    