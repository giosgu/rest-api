import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CasosPage } from '../casos/casos';

@Component({
    selector: 'page-casos',
    templateUrl: 'casos.html'
  })
  export class CasosPendientesPage extends CasosPage {

    protected inicializar(casos:any[]){
        this.casos = this.filtrarCasos(casos, "Nuevo")
        this.msgSinCasos = "No posee casos pendientes de aceptación"
        this.titulo = "Casos Pendientes"
    }
    
  }
    