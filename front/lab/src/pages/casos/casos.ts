import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import {CasosServiceProvider} from '../../providers/casos-service/casos-service';
import {CasoPage} from '../caso/caso'

@Component({
  selector: 'page-casos',
  templateUrl: 'casos.html'
})
export class CasosPage {
  selectedItem: any;
  icons: string[];
  users: any[] = [];
  protected casos: any[] = [];
  caso:any;
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

  protected inicializar(casos:any[]){
    this.casos = casos;
    this.msgSinCasos = "No posee casos asignados"
    this.titulo = "Casos de Urgencias"
  }

  protected obtenerCasos() {
    return this.casosService.getCasos()
    
  }

  protected filtrarCasos(parameter:any[], estado:string){
    let casosFiltrados = []
    for (let entry of parameter) {
        if(entry.estado === estado){
            casosFiltrados.push(entry);
        }
    }
    return casosFiltrados;
  }
}
