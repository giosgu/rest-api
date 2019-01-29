import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CasosPage } from '../casos/casos';

@Component({
    selector: 'page-casos',
    templateUrl: 'casos.html'
  })
  export class CasosAbiertosPage extends CasosPage {

    casos: any[];
    titulo:string;

      protected inicializar(casos:any[]){
        this.casos = this.filtrarCasos(casos, "Aceptado")
        this.msgSinCasos = "No posee casos aceptados"
        this.titulo = "Casos Aceptados"
      }

    }


    