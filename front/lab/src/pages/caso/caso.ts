import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CasoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-caso',
  templateUrl: 'caso.html',
})
export class CasoPage {
  private caso:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.caso =navParams.get("caso");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasoPage');
  }

}
