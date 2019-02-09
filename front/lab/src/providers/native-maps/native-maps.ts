import {CasoPage} from '../../pages/caso/caso';
import { Injectable } from '@angular/core';
import { GoogleMaps, LatLng, GoogleMapsEvent, Marker, GoogleMapsAnimation, HtmlInfoWindow } from '@ionic-native/google-maps';
import { CasoUrgencia } from 'casosUrgencias';
import { App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
      controls: {
        myLocation : true,
        myLocationButton : true
      },
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

  public suscribeCurrentPosition(geolocation:Geolocation){
   let watch = geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
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
      title: 'Caso ' + caso.numero + ' ('+caso.estado+')',
      snippet:'Asignado a las: '+ caso.horaAsignacion,
      animation: this.definirAnimacion(caso),
      icon:this.definirColorIcono(caso),
      position: latLng
    });
    let that = this;
    marker.set('caso', caso)
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      marker.showInfoWindow()
    });
    marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
      let c:CasoUrgencia = marker.get('caso');
      this.app.getActiveNav().push(CasoPage, {caso:c});
    });
    marker.on(GoogleMapsEvent.INFO_LONG_CLICK).subscribe(() => {
      marker.hideInfoWindow();
    });

  }

  private definirAnimacion(caso:CasoUrgencia):string{
    if(caso.estado == CasoPage.ESTADO_ABIERTO){
      return GoogleMapsAnimation.BOUNCE
    }else{
      return null
    }
  }
  private definirColorIcono(caso:CasoUrgencia):string{
    if(caso.estado == CasoPage.ESTADO_ABIERTO){
      return 'green'
    }
    if(caso.estado == CasoPage.ESTADO_ACEPTAR){
      return 'red'
    }
    return 'blue';
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