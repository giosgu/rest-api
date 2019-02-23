import { Platform, App } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { JsMapsProvider } from './../js-maps/js-maps';
import { NativeMapsProvider } from './../native-maps/native-maps';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpHelperProvider } from '../http-helper/http-helper';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapsProvider {

  map: any;

  
  constructor(public platform: Platform, public app: App, private helper:HttpHelperProvider, 
    googleMaps:GoogleMaps, geolocation:Geolocation, private locationAccuracy: LocationAccuracy) {
    if(helper.isCordova()){
        this.map = new NativeMapsProvider(googleMaps, app);
    } else {
        this.map = new JsMapsProvider(app);
        
    }
   // this.map = new JsMapsProvider(app);
  }

  init(location, element){
    this.map.init(location, element);
  }

  public addMarker(lat: number, lng: number){
    this.map.addMarker(lat, lng);
  }

  public addMarkers(array:any[]){
       this.map.addMarkers(array)
   }
   
   public addMarkerCurrentPosition(geolocation:Geolocation){
     this.map.addMarkerCurrentPosition(geolocation)
   }

   public clearMarkers():Promise<any>{
     return this.map.clearMarkers();
   }
}
