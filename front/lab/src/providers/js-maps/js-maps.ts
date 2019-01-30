import { Injectable } from '@angular/core';
import { GoogleMapsEvent } from '@ionic-native/google-maps';

declare var google;

@Injectable()
export class JsMapsProvider {

  map: any;

  constructor() {
    
  }

  init(location, element){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let opts = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(element.nativeElement, opts);

    alert(this.map.constructor)
  }

}