import {CasoPage} from '../../pages/caso/caso';
import { Injectable } from '@angular/core';
import { GoogleMaps, LatLng, GoogleMapsEvent, Marker, GoogleMapsAnimation, GoogleMap } from '@ionic-native/google-maps';
import { CasoUrgencia } from 'casosUrgencias';
import { App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Injectable()
export class NativeMapsProvider {

  map: GoogleMap;

  //Documentación
  //https://github.com/ionic-team/ionic-native-google-maps/blob/master/documents/README.md
  constructor(public googleMaps: GoogleMaps, public app: App, private locationAccuracy: LocationAccuracy) {

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

  setMyLocationEnabled(valor:boolean){
    if(this.map != undefined){
      this.map.setMyLocationEnabled(valor);
    }
  }

// se comenta porque funciona mal
setMyLocationEnabled2(valor:boolean){
/*    console.log(this.constructor.name + " ingreso a SetMyLocationEnabled() - valor: " + valor )
    //primero me aseguro que la vista se haya cargado
    if(this.map != undefined){
      console.log("map != undefined")
      //si el valor es true, verifico si hay acceso a la ubicacion, o lo solicito
      if(valor){
        console.log("valor: true")
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if(canRequest){
            console.log("can request")
            this.locationAccuracy.isRequesting().then(
              (isRequesting:boolean)=>{
                if(!isRequesting){
                  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    (permitted:boolean) => {
                      console.log("permitted " + permitted)
                      if(permitted){
                        console.log("Se cambia la propiedad this.map.setMyLocationEnabled (1): " + valor)
                        this.map.setMyLocationEnabled(valor)
                      }else{
                        //this.map.setMyLocationEnabled(false)
                        //console.log("Se cambia la propiedad this.map.setMyLocationEnabled: (2): " + false)
                        console.log("No se permitió la geolocalización setMyLocationEnabled(): "+ valor)
                      }
                    }, error => console.log('Error requesting location permissions', error)
                  );
                  this.map.setMyLocationEnabled(valor)
                }
            }
            );
          }
        });
        //si es false me ahorro ese paso
      }else{
        this.map.setMyLocationEnabled(valor)
        console.log("Se cambia la propiedad this.map.setMyLocationEnabled: (3) " + valor)
      }
    }
  */  }

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

  public clearMarkers():Promise<any>{
    return this.map.clear()
  }
}