import { Component } from '@angular/core';
import { CasosPage } from '../casos/casos';
import { CasoUrgencia } from 'casosUrgencias';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
    
    protected filtrarParaChangeDetector( casos:CasoUrgencia[]):CasoUrgencia[]{
      this.casos = this.filtrarCasos(casos, "Nuevo");
      return this.casos
    }

  }
    