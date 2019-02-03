import { Injectable, ViewChild } from '@angular/core';
import {} from 'googlemaps';
import { CasoUrgencia } from 'casosUrgencias';
import { CasoPage } from '../../pages/caso/caso';
import { Nav, App } from 'ionic-angular';



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
  private readonly PIN_VERDE = 'http://maps.google.com/mapfiles/ms/micons/green-dot.png'
  private readonly PIN_ROJO = 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
  private readonly PIN_AZUL = 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'
 
  

//  caso:caso;

  constructor( public app: App ) {

  }

  init(location, element){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let opts = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(element.nativeElement, opts);
   /* var legend:HTMLElement = document.getElementById('legend');
    this.armarLeyenda(legend)
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    */
  }

private armarLeyenda(legend:HTMLElement){
  
  
      var icons = {
        visitaMedica: {
          name: 'Visita Médica',
          icon: this.PIN_ROJO
        },
        visitaBrevedad: {
          name: 'Visita Brevedad',
          icon: this.PIN_AZUL,
        }
      };

  for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    //div.innerHTML = '<img src="'+icon+'"> ' + '  ' +name;
    div.innerHTML = '<i class="material-icons" style="color:green">place</i>' + name;
    legend.appendChild(div);
  }
}

  public addMarker(caso:CasoUrgencia): void {
    let latLng = new google.maps.LatLng(+caso.direccion.coordenadas.latitud, +caso.direccion.coordenadas.longitud);
    let marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
    });
    caso.estado == CasoPage.ESTADO_ABIERTO ? marker.setAnimation(google.maps.Animation.BOUNCE): '';
    
   // marker.setIcon(this.definirIcono(caso))
    let that = this;
    marker.addListener('click', function() {
     that.abrirCaso(caso)
    });
    this.markers.push(marker);

  }
  public addMarkers(casos:CasoUrgencia[]){
    casos.forEach(caso => {
      this.addMarker(caso)
    });
  }

  public abrirCaso(caso:CasoUrgencia){
   this.app.getActiveNav().push(CasoPage, {caso:caso});
  }    
  
  private definirIcono(caso:CasoUrgencia):string{
    switch(caso.tipoVisita){
      case CasoPage.VISITA_MEDICA:{
        return this.PIN_ROJO;
      }
      default:{
        return this.PIN_AZUL
      }
    }
  }

}