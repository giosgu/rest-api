import { Component, ViewChild } from '@angular/core';
import { Nav,  Platform,  AlertController,  LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { CargaTabCasosPage } from '../pages/carga-tab-casos/carga-tab-casos';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { LocationAccuracyPage } from '../pages/location-accuracy/location-accuracy';
import { CasosServiceProvider } from '../providers/casos-service/casos-service';
import { CasoPage } from '../pages/caso/caso';
import { Events, ToastController  } from 'ionic-angular';
import { CasoUrgencia } from 'casosUrgencias';
import { CasosUtils } from '../providers/utils/casosUtils';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { EventosProvider } from '../providers/eventos/eventos';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CargaTabCasosPage;
  pages: Array<{title: string, component: any}>;
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private push: Push,
    public alertCtrl: AlertController, private casoService:CasosServiceProvider, public loadingCtrl: LoadingController,
    public events: Events, public network: Network, public networkProvider: NetworkProvider, 
    public toastCtrl: ToastController, public eventosProvider:EventosProvider ) {
    
      this.initializeApp();

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
      this.networkProvider.initializarNetworkEvents();
      this.administrarEventosDeRed();

    });
  }

  administrarEventosDeRed(): any {
        // Suscribo al evento "offline"
        this.events.subscribe('network:offline', () => {
          this.networkProvider.presentToast()
        });
         // Suscribo al evento "online"
         this.events.subscribe('network:online', () => {
          this.networkProvider.closeToast();
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
        
        console.log('El dispositivo tiene permisos para enviarle notificaciones push');
        
        const pushObject: PushObject = this.push.init(options);
        
        pushObject.on('registration').subscribe((data: any) => {
          console.log('device token -> ' + data.registrationId);
          //TODO - send device token to server
        });

        //Action button "verCaso"
        pushObject.on('verCaso').subscribe((fcmData: any) => {
          console.log(new Date() + " opción mensaje push: verCaso");
          this.mostrarCaso(fcmData.additionalData.numero);
        });

        pushObject.on('notification').subscribe((fcmData: any) => {
          console.log('message -> ' + fcmData.message);
          //if user using app and push notification comes
          if (fcmData.additionalData.foreground) {
            // if application open, show popup
            let confirmAlert = this.alertCtrl.create({
              title: fcmData.title,
              message: fcmData.message,
              buttons: [{
                text: 'Ignorar',
                //role: 'cancel'
                handler: () => {
                  //si no quiere ver el caso, igual actualizo las listas de caso en las demás vistas
                  this.casoService.getCasos().subscribe(
                    (casosUrgencias) => { // Success
                      let casos:CasoUrgencia[] = casosUrgencias['CasoUrgencias'];
                      //publico evento de actualización de casos
                      this.publicarEventoActualizacionCasos(casos)
                    }
                  )
                }
              }, {
                text: 'Ver Caso',
                handler: () => {
                  console.log(new Date() + " opción alertCtrl: verCaso");
                  this.mostrarCaso(fcmData.additionalData.numero);
                }
              }]
            });
            confirmAlert.present();
          } else {
            //if user NOT using app and push notification comes
            //TODO: Your logic on click of push notification directly
            //this.nav.push(DetailsPage, { message: data.message });
            console.log('Push notification clicked');
            if(fcmData.additionalData.tipoNotificacion == 'nuevoCasoUrgencia'){
              console.log(new Date() + " tipo notificación push: nuevoCasoUrgencia" );
              this.mostrarCaso(fcmData.additionalData.numero);
            }
           
          }
        });
        
      } else {
        console.log('We do not have permission to send push notifications');
      }
      
    });


  }

  private mostrarCaso(numeroCaso: string){
    let loader = this.loadingCtrl.create({
      content: 'Cargando el caso ' + numeroCaso,
    });
    loader.present().then(() => {
      this.casoService.getCasos().subscribe(
        (casosUrgencias) => { // Success
          let casos:CasoUrgencia[] = casosUrgencias['CasoUrgencias'];
          //publico evento de actualización de casos
          this.publicarEventoActualizacionCasos(casos)
          let nuevoCaso:CasoUrgencia = CasosUtils.getCaso(casos,numeroCaso )
          //invoco la vista de casos
          loader.dismiss();
          this.nav.push(CasoPage, {
            caso: nuevoCaso
          });
        }
      )
    });
  }

  private publicarEventoActualizacionCasos(casos:CasoUrgencia[]){
    this.eventosProvider.publicarEventoActualizacionCasos(casos);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
