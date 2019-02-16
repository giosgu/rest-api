import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { CargaTabCasosPage } from '../pages/carga-tab-casos/carga-tab-casos';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { LocationAccuracyPage } from '../pages/location-accuracy/location-accuracy';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CargaTabCasosPage;

  pages: Array<{title: string, component: any}>;
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private push: Push,
    public alertCtrl: AlertController) {
    
      this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Casos', component: CargaTabCasosPage },
      { title: 'Notificaciones', component: NotificacionesPage },
      { title: 'Location', component: LocationAccuracyPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.iniciarNotificacionesPush();
    });
  }
  iniciarNotificacionesPush():void {
    const options: PushOptions = {
      android: {
        senderID: '423406757582'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'true'
      }
    };
 
    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {

      if (res.isEnabled) {
        
        console.log('We have permission to send push notifications');
        
        const pushObject: PushObject = this.push.init(options);
        
        pushObject.on('registration').subscribe((data: any) => {
          console.log('device token -> ' + data.registrationId);
          //TODO - send device token to server
        });

        pushObject.on('notification').subscribe((data: any) => {
          console.log('message -> ' + data.message);
          //if user using app and push notification comes
          if (data.additionalData.foreground) {
            // if application open, show popup
            let confirmAlert = this.alertCtrl.create({
              title: 'New Notification',
              message: data.message,
              buttons: [{
                text: 'Ignore',
                role: 'cancel'
              }, {
                text: 'View',
                handler: () => {
                  //TODO: Your logic here
                  //this.nav.push(DetailsPage, { message: data.message });
                }
              }]
            });
            confirmAlert.present();
          } else {
            //if user NOT using app and push notification comes
            //TODO: Your logic on click of push notification directly
            //this.nav.push(DetailsPage, { message: data.message });
            console.log('Push notification clicked');
          }
        });

      } else {
        console.log('We do not have permission to send push notifications');
      }

    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
