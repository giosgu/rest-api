import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CasosPage } from '../casos/casos';

@Component({
    selector: 'page-casos',
    templateUrl: 'casos.html'
  })
  export class CasosPendientesPage extends CasosPage {

    ionViewDidLoad(){
        this.obtenerCasos().subscribe(
            (data) => { // Success
                let tmp = data['results'];
                for (let entry of tmp) {
                    //if(entry.estado === "Nuevo"){
                        this.casos.push(entry);
                    //}
                }
            },
            (error) =>{
              alert("error en getCasos " + error);
            }
          )

                
    }
  }
    