import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Events, Toast, ToastController } from 'ionic-angular';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable()
export class NetworkProvider {

  previousStatus;
  toast: Toast = null;

  constructor(public http: HttpClient, public network: Network, public eventCtrl: Events, 
    private toastCtrl: ToastController) {
    console.log('Inicializado NetworkProvider Provider');
    this.previousStatus = ConnectionStatusEnum.Online;

  }

  public initializarNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Online) {
            this.eventCtrl.publish('network:offline');
        }
        this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Offline) {
            this.eventCtrl.publish('network:online');
        }
        this.previousStatus = ConnectionStatusEnum.Online;
    });
  }

  presentToast(){
    let toastData = {
        message: "No hay conexión a internet.",
        position: 'bottom'
    }
    this.showToast(toastData);
  }

  private showToast(data:any):void{
    this.toast ? this.toast.dismiss() : false;
    this.toast = this.toastCtrl.create(data);
    this.toast.present();
  }

  closeToast(){
    this.toast ? this.toast.dismiss() : false;
  }
}
