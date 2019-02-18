import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CasosServiceProvider} from '../../providers/casos-service/casos-service';
import {CasoPage} from '../caso/caso'
import {CasoUrgencia} from  'casosUrgencias'
import { Events } from 'ionic-angular';
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'page-casos',
  templateUrl: 'casos.html'
})
export class CasosPage implements OnInit {
  selectedItem: any;
  icons: string[];
  users: any[] = [];
  protected casos: CasoUrgencia[] = [];
  caso:CasoUrgencia;
  titulo:string
  msgSinCasos:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public casosService: CasosServiceProvider,public events: Events, 
    public changeDetector: ChangeDetectorRef) {
      this.inicializar(this.casos = navParams.get("casos"));
    }
    
  ngOnInit() {
      this.suscribirEvento();
      
  }

  ngOnDestroy() {
    this.events.unsubscribe('casos:actualizacion');
    console.log(this.constructor.name + ": desuscripto a evento casos:actualizacion")
  }

  suscribirEvento() {
    this.events.subscribe('casos:actualizacion', (casos:CasoUrgencia[], time) => {
      console.log( this.constructor.name + ": evento 'casos:actualizacion' recibido. Cantidad de casos: " + casos.length);
      this.casos = casos;
      console.log( this.constructor.name + ": evento 'casos:actualizacion' finalizó el procesamiento")
    });
  }

  mostrarCaso($event, caso){
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CasoPage, {
      caso: caso
    });
   
  }    

  protected inicializar(casos:CasoUrgencia[]){
    this.casos = casos;
    this.msgSinCasos = "No posee casos asignados"
    this.titulo = "Casos de Urgencias"
  }

  protected obtenerCasos() {
    return this.casosService.getCasos()
    
  }

  protected filtrarCasos(casos:CasoUrgencia[], estado:string){
    let casosFiltrados :CasoUrgencia[] = []
    for (let caso of casos) {
        if(caso.estado === estado){
            casosFiltrados.push(caso);
        }
    }
    return casosFiltrados;
  }

  protected filtrarParaChangeDetector( casos:CasoUrgencia[]):CasoUrgencia[]{
    return casos;
  }
}
