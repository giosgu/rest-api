import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

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

  constructor(private locationAccuracy: LocationAccuracy) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationAccuracyPage');
  }

  public location(){
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {alert('Request successful')},
          error => alert('Error requesting location permissions ' + error)
        );
      }
    
    });
  }
}
