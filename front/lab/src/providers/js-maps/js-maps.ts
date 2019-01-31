import { Injectable } from '@angular/core';
import { GoogleMapsEvent } from '@ionic-native/google-maps';
import {} from 'googlemaps';

declare module 'googlemaps';

//const mapRef: google.maps.Map;
//const bounds: google.maps.LatLngBounds;
//const latLng: google.maps.LatLng;
//https://sites.google.com/site/gmapsdevelopment/
//div.innerHTML ='<i class="material-icons" style="color:green">place</i>' + name;


@Injectable()
export class JsMapsProvider {
  
  map: any;
  markers:any[]=[]
  caso:caso;

  constructor() {
    
  }

  init(location, element){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let opts = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(element.nativeElement, opts);
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    //http://maps.google.com/mapfiles/kml/paddle/grn-blank.png
        var icons = {
          parking: {
            name: 'Visita Médica',
            icon: iconBase + 'parking_lot_maps.png',
            color:  'green'
          },
          library: {
            name: 'Visita Brevedad',
            icon: 'https://maps.google.com/mapfiles/kml/paddle/grn-blank.png',
            color:  'green'
          }
        };
    var legend = document.getElementById('legend');
    for (var key in icons) {
      var type = icons[key];
      var name = type.name;
      var icon = type.icon;
      var color = type.color
      var div = document.createElement('div');
      //div.innerHTML = '<img src="' + icon + '"> ' + name;
      //div.innerHTML ='<i class="material-icons" style="color:'+color+'>place</i>' + name
      //div.innerHTML ='<i class="material-icons" style="color:green">place</i>' + name;
      div.innerHTML = '<img src="http://maps.google.com/mapfiles/ms/micons/green.png"> ' + name;
      legend.appendChild(div);
    }

    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    
  }

  public addMarker(lat: number, lng: number): void {

   let latLng = new google.maps.LatLng(lat, lng);
    let marker = new google.maps.Marker({
        map: this.map,
 //       animation: google.maps.Animation.BOUNCE,
        position: latLng,
       
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/micons/green.png')
    this.markers.push(marker);

}
public addMarkers(array:any[]){
  array.forEach(element => {
    this.addMarker(element.latitud, element.longitud)
  });
}

}