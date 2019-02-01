import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import {CasosServiceProvider} from '../../providers/casos-service/casos-service';
import {CasoPage} from '../caso/caso'
import {CasoUrgencia} from  'casosUrgencias'

@Component({
  selector: 'page-casos',
  templateUrl: 'casos.html'
})
export class CasosPage {
  selectedItem: any;
  icons: string[];
  users: any[] = [];
  protected casos: CasoUrgencia[] = [];
  caso:CasoUrgencia;
  titulo:string
  msgSinCasos:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public userService: UserServiceProvider, public casosService: CasosServiceProvider) {
      this.inicializar(this.casos = navParams.get("casos"));
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
}
