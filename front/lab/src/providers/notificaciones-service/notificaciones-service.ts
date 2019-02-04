import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NotificacionesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacionesServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NotificacionesServiceProvider Provider');
  }

  getNotificaciones(){
    return this.http.get("/api/notificaciones");
  }

}
