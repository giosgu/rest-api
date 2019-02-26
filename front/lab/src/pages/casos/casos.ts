import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CasosServiceProvider} from '../../providers/casos-service/casos-service';
import {CasoPage} from '../caso/caso'
import {CasoUrgencia} from  'casosUrgencias'
import { Events } from 'ionic-angular';
import { ChangeDetectorRef } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { EventosProvider } from '../../providers/eventos/eventos';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

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
  protected cantidadNotificacionesSinLeer:number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public casosService: CasosServiceProvider,public events: Events, 
    public changeDetector: ChangeDetectorRef, public eventosProvider:EventosProvider, 
    public storageService:StorageServiceProvider, private zone:NgZone) {
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
      this.casos = this.filtrarParaChangeDetector(casos);
      this.changeDetector.detectChanges();
    });
    
    this.storageService.notificacionesNoLeidas.subscribe((cantidad:number)=>{
      console.log(this.constructor.name + " suscripto al BehaviorSubject de notificacionesNoLeidas")
      //sin esto no se actualiza el badge sin refrescar la página!
      this.zone.run(()=>this.cantidadNotificacionesSinLeer = cantidad);
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
    return this.casosService.filtrarCasos(casos, estado);
  }

  protected filtrarParaChangeDetector( casos:CasoUrgencia[]):CasoUrgencia[]{
    return casos;
  }

  doRefresh(refresher) {
    this.obtenerCasos().subscribe(
      (data) => { // Success
        let casosUrgencias:CasoUrgencia[] = data['CasoUrgencias'];
        this.casos = this.filtrarParaChangeDetector(casosUrgencias)
        this.eventosProvider.publicarEventoActualizacionCasos(casosUrgencias);
      },
      (error:HttpErrorResponse) =>{
        console.log("Error cargando casos: " + error.status + " " + error.message )
        if(error.status == 500){
          alert("El servidor no se encuentra disponible, intente más tarde." );
        }else{
          alert("El servidor no se encuentra disponible, intente más tarde." );
        }
       
      }
      )
      refresher.complete();
  }
}
