import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CasosPage } from '../pages/casos/casos';
import { CasoPage } from '../pages/caso/caso';
import { TabCasosPage } from '../pages/tab-casos/tab-casos';
import { CasosPendientesPage } from '../pages/casos/casosPendientes';
import { CasosAbiertosPage } from '../pages/casos/casosAbiertos';
import { CargaTabCasosPage } from '../pages/carga-tab-casos/carga-tab-casos';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { LocationAccuracyPage } from '../pages/location-accuracy/location-accuracy';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { CasosServiceProvider } from '../providers/casos-service/casos-service';
import { MapsProvider } from '../providers/maps/maps';
import { JsMapsProvider } from '../providers/js-maps/js-maps';
import { NativeMapsProvider } from '../providers/native-maps/native-maps';
import { MapCasosPage } from '../pages/map-casos/map-casos';
import { NotificacionesServiceProvider } from '../providers/notificaciones-service/notificaciones-service';
import { HttpHelperProvider } from '../providers/http-helper/http-helper';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Push } from '@ionic-native/push';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CasosPage,
    CasoPage,
    TabCasosPage,
    CasosPendientesPage,
    CasosAbiertosPage,
    CargaTabCasosPage,
    MapCasosPage,
    NotificacionesPage,
    LocationAccuracyPage,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CasosPage,
    CasoPage,
    TabCasosPage,
    CasosPendientesPage,
    CasosAbiertosPage,
    CargaTabCasosPage,
    MapCasosPage,
    NotificacionesPage,
    LocationAccuracyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    CasosServiceProvider,
    Geolocation,
    MapsProvider,
    JsMapsProvider,
    NativeMapsProvider,
    GoogleMaps,
    NotificacionesServiceProvider,
    HttpHelperProvider,
    LocationAccuracy,
    LaunchNavigator, 
    Push
  ]
})
export class AppModule {}
