import { Component } from '@angular/core';
import { CasosPage } from '../casos/casos';
import { CasoUrgencia } from 'casosUrgencias';

@Component({
    selector: 'page-casos',
    templateUrl: 'casos.html'
  })
  export class CasosAbiertosPage extends CasosPage {

    titulo:string;

      protected inicializar(casos:any[]){
        this.casos = this.filtrarCasos(casos, "Aceptado")
        this.msgSinCasos = "No posee casos aceptados"
        this.titulo = "Casos Aceptados"
      }

      protected filtrarParaChangeDetector( casos:CasoUrgencia[]):CasoUrgencia[]{
        return this.filtrarCasos(casos, "Aceptado")
      }
    
    }


    