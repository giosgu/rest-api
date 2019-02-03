import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsProvider } from './../../providers/maps/maps';
import { CasoUrgencia } from 'casosUrgencias';

/**
 * Generated class for the MapCasosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@IonicPage()
@Component({
  selector: 'page-map-casos',
  templateUrl: 'map-casos.html',
})
export class MapCasosPage {
  
  location: {
    latitude: number,
    longitude: number
  };
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public markers: any[] = [];
  protected casos: CasoUrgencia[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public mapsProvider: MapsProvider) {
    this.casos = navParams.get("casos")
  }

  ionViewDidLoad() {
    this.findUserLocation();
  }
 
  findUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
 
 
    this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.mapsProvider.init(this.location, this.mapElement);
      this.marcarCasosAsignados();
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  marcarCasosAsignados(){
    this.mapsProvider.addMarkers(this.casos);
  }
}
