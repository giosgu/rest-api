import { Component, ViewChild, NgZone } from '@angular/core';
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

import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { NotificacionOsde } from 'notificacionOsde';
import { NotificacionPage } from '../pages/notificacion/notificacion';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CargaTabCasosPage;
  pages: Array<{title: string, component: any, icon:string}>;
  protected cantidadNotificacionesSinLeer:number;
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private push: Push,
    public alertCtrl: AlertController, private casoService:CasosServiceProvider, public loadingCtrl: LoadingController,
    public events: Events, public network: Network, public networkProvider: NetworkProvider, 
    public toastCtrl: ToastController, public eventosProvider:EventosProvider, 
    private storageService:StorageServiceProvider, private zone:NgZone ) {
    
      this.initializeApp();

    this.pages = [
      { title: 'Casos', component: CargaTabCasosPage, icon:"medkit" },
      { title: 'Notificaciones', component: NotificacionesPage, icon:"notifications" },
      { title: 'Location', component: LocationAccuracyPage, icon:"compass" },
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
      this.administrarNotificacionesDeOsde();

    });
  }
  administrarNotificacionesDeOsde(): any {
    this.storageService.setup();
    this.storageService.notificacionesNoLeidas.subscribe((cantidad:number)=>{
      console.log(this.constructor.name + " BehaviorSubject de notificacionesNoLeidas: " + cantidad)
      //sin esto no se actualiza el badge sin refrescar la página!
      this.zone.run(()=>this.cantidadNotificacionesSinLeer = cantidad);
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

        //Action button "nostrar notificacion"
        pushObject.on('verNotificacion').subscribe((fcmData: any) => {
          console.log(new Date() + " opción mensaje push: verNotificacion");
          this.mostrarNotificacion(fcmData.additionalData.notId)
        });

        

        pushObject.on('notification').subscribe((fcmData: any) => {
          console.log('message -> ' + fcmData.message);
          //Si la aplicación está en foreground
          if (fcmData.additionalData.foreground) {
            //dependiendo el tipo de notificacion, realizo una acción distinta
            switch(fcmData.additionalData.tipoNotificacion){
              //si al usuario se le asignó un nuevo caso de Urgencia
              case "nuevoCasoUrgencia":{
                // Mostramos un popup
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
                break; 
              // si se le envió una notificación desde Urgencias  
              }case "mensajeOsde":{
                this.registrarNotificacion(fcmData);
              }
            }  
          } else {
            //if user NOT using app and push notification comes
            //TODO: Your logic on click of push notification directly
            //this.nav.push(DetailsPage, { message: data.message });
            console.log('Se recibió notificación push ');
            if(fcmData.additionalData.tipoNotificacion == 'nuevoCasoUrgencia'){
              console.log(new Date() + " tipo notificación push: nuevoCasoUrgencia" );
              this.cargarCasos();
            }

            if(fcmData.additionalData.tipoNotificacion == 'mensajeOsde'){
              console.log(new Date() + " tipo notificación push: mensajeOsde" );
              this.registrarNotificacion(fcmData);
            }

          }
        });
        
      } else {
        console.log('We do not have permission to send push notifications');
      }
      
    });


  }
  registrarNotificacion(fcmData: any): any {
    this.storageService.registrarNotificacion(fcmData);
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

  private cargarCasos(){
    console.log("Se refresca la lista de casos por notificación push recibida")
    this.casoService.getCasos().subscribe(
      (casosUrgencias) => { // Success
        let casos:CasoUrgencia[] = casosUrgencias['CasoUrgencias'];
        //publico evento de actualización de casos
        this.publicarEventoActualizacionCasos(casos)
      }
    )
  }

  private publicarEventoActualizacionCasos(casos:CasoUrgencia[]){
    this.eventosProvider.publicarEventoActualizacionCasos(casos);
  }

  mostrarNotificacion(notId:number){
    console.log("click para mostrar la notificación: " + notId)
    this.storageService.getNotificacion(notId).then((notificacion:NotificacionOsde)=>{
      this.nav.push(NotificacionPage, {
        notificacionOsde: notificacion
      });
    }).catch((err) => {
      console.error(err); 
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
