import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CasosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CasosServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CasosServiceProvider Provider');
  }

  getCasos(){
    //return this.http.get("http://localhost:3000/casos");
    return this.http.get("https://randomuser.me/api/?results=25");
  }
}
