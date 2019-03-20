import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the HttpHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpHelperProvider {

  constructor(public http: HttpClient, private platform: Platform) {
    console.log('Hello HttpHelperProvider Provider');
  }

  public isCordova():boolean{
    return(this.platform.is('cordova') && 
      (this.platform.is('ios') || this.platform.is('android')))
  }

  public resolveGetUrl(endpoint:string):Observable<Object>{
    let url:string;
    if(this.isCordova())
        url = "http://10.66.214.166:3000"
        //url = "http://192.168.0.148:3000"
    else
        url ="/api"    
    return this.http.get(url+endpoint)
  }

}
