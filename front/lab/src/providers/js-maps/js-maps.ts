import { Injectable } from '@angular/core';
import { GoogleMapsEvent } from '@ionic-native/google-maps';
import {} from 'googlemaps';
import { CasoUrgencia } from 'casosUrgencias';
import { CasoPage } from '../../pages/caso/caso';
import { directive } from '@angular/core/src/render3/instructions';
import { ModalController } from 'ionic-angular';
import { ModalMapCasoPage } from '../../pages/modal-map-caso/modal-map-caso';


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
  private readonly PIN_AZUL = 'http://maps.google.com/mapfiles/ms/micons/blue.png'
 
  

//  caso:caso;

  constructor( public modalCtrl: ModalController ) {

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
          icon: this.PIN_VERDE
        },
        visitaBrevedad: {
          name: 'Visita Brevedad',
          icon: this.PIN_ROJO,
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
    marker.setIcon(this.definirIcono(caso))
    let that = this;
    marker.addListener('click', function() {
     that.abrirModalCaso(caso)
    });
    this.markers.push(marker);

  }
  public addMarkers(casos:CasoUrgencia[]){
    casos.forEach(caso => {
      this.addMarker(caso)
    });
  }

  public abrirModalCaso(caso:CasoUrgencia){
    var modalPage = this.modalCtrl.create(CasoPage, {"caso": caso}, {cssClass:"modal-map-caso"}); 
    modalPage.present(); 
  }    
  
  private definirIcono(caso:CasoUrgencia):string{
    switch(caso.tipoVisita){
      case CasoPage.VISITA_MEDICA:{
        return this.PIN_VERDE;
      }
      default:{
        return this.PIN_ROJO
      }
    }
  }

 
}