import { Injectable } from '@angular/core';
import { HttpHelperProvider } from '../http-helper/http-helper';

/*
  Generated class for the CasosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CasosServiceProvider {

  constructor(private helper: HttpHelperProvider) {
    
  }

  getCasos(){
    return this.helper.resolveGetUrl("/casos");
  }
}
