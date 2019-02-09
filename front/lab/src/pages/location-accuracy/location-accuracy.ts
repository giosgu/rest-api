import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the LocationAccuracyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-accuracy',
  templateUrl: 'location-accuracy.html',
})
export class LocationAccuracyPage {

  location: {
    latitude: number,
    longitude: number
  };

  constructor(private locationAccuracy: LocationAccuracy, private geolocation: Geolocation) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationAccuracyPage');
  }

  public locationn(){
    
/*    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {alert('Request successful')},
          error => alert('Error requesting location permissions ' + error)
        );
      }
    
    });
  */
    this.hayAccesoaUbicacionUsuario();
  }

  public hayAccesoaUbicacionUsuario(){
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            this.ubicarUsuario();
          },
          error => {this.ubicarDefault()}
        );
      }
    });
   }
  ubicarUsuario(): any {
    this.findUserLocation();
  }
  ubicarDefault(): any {
    this.location = {
      latitude: -34.6757026,
      longitude: -58.5939137
    };
    alert("cancha river")
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
      alert("usuarioLocalizado")
     }).catch((error) => {
      console.log('Error getting location', error);
      alert("Se proodujo un error al iniciar la geolocalizacion")
    });

  }
}
