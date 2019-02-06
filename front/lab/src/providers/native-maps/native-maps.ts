import {CasoPage} from '../../pages/caso/caso';
import { Injectable } from '@angular/core';
import { GoogleMaps, LatLng, GoogleMapsEvent, Marker, GoogleMapsAnimation } from '@ionic-native/google-maps';
import { CasoUrgencia } from 'casosUrgencias';
import { App } from 'ionic-angular';

@Injectable()
export class NativeMapsProvider {

  map: any;

  //Documentación
  //https://github.com/ionic-team/ionic-native-google-maps/blob/master/documents/README.md
  constructor(public googleMaps: GoogleMaps, public app: App) {

  }

  init(location, element){

    let latLng = new LatLng(location.latitude, location.longitude);
    let opts = {
      camera: {
        latLng: latLng,
        zoom: 12,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(element.nativeElement, opts);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }

  public addMarker(caso:CasoUrgencia): void {
    let latLng = new LatLng(+caso.direccion.coordenadas.latitud, +caso.direccion.coordenadas.longitud);
    //let marker = new Marker( this.map, latLng);
    //caso.estado == CasoPage.ESTADO_ABIERTO ? marker.setAnimation(GoogleMapsAnimation.BOUNCE): '';
    
   // marker.setIcon(this.definirIcono(caso))
//    marker.addListener('click', function() {
//     that.abrirCaso(caso)
//    });
    //this.markers.push(marker);
    let animation = CasoPage.ESTADO_ABIERTO ? GoogleMapsAnimation.BOUNCE : '';
    let marker: Marker = this.map.addMarkerSync({
      title: 'Caso ' + caso.numero + ' Estado: ' + caso.estado ,
      icon: 'blue',
      animation: animation,
      position: latLng
    });
    let that = this;
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //that.abrirCaso(caso)
      marker.showInfoWindow()
    });
  }

  public abrirCaso(caso:CasoUrgencia){
    this.app.getActiveNav().push(CasoPage, {caso:caso});
   }    
 
   public addMarkers(casos:CasoUrgencia[]){
    casos.forEach(caso => {
      this.addMarker(caso)
    });
  }

}