import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelperProvider } from '../http-helper/http-helper';

/*
  Generated class for the NotificacionesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacionesServiceProvider {

  constructor(public http: HttpClient, private helper:HttpHelperProvider) {
    console.log('Hello NotificacionesServiceProvider Provider');
  }

  getNotificaciones(){
    return this.helper.resolveGetUrl("/notificaciones");
  }

}
