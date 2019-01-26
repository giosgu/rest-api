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
  casos: any[] = [];
  caso:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public userService: UserServiceProvider, public casosService: CasosServiceProvider) {
   
  }

  mostrarCaso($event, caso){
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CasoPage, {
      caso: caso
    });
  }

  ionViewDidLoad(){
    this.userService.getUsers()
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
      },
      (error) =>{
        console.error(error);
      }
    )
    

    this.casosService.getCasos()
    .subscribe(
      (data) => { // Success
        this.casos = data['results'];
      },
      (error) =>{
        alert("error en getCasos " + error);
      }
    )
  }
}
