import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-casos',
    templateUrl: 'casos.html'
  })
  export class CasosAbiertosPage {

    casos: any[] = [];
    titulo:string;
    parametro: any[]; 

    constructor(public navCtrl: NavController, public navParams: NavParams ){
        alert("casosAbiertos.ts " + navParams.get("parametro"));
        this.parametro = navParams.get("parametro");
        alert(this.parametro.length)
      }

    ionViewDidLoad(){
    }
  }
    