import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CasosPage } from '../pages/casos/casos';
import { CasoPage } from '../pages/caso/caso';
import { TabCasosPage } from '../pages/tab-casos/tab-casos';
import { CasosPendientesPage } from '../pages/casos/casosPendientes';
import { CasosAbiertosPage } from '../pages/casos/casosAbiertos';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { CasosServiceProvider } from '../providers/casos-service/casos-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CasosPage,
    CasoPage,
    TabCasosPage,
    CasosPendientesPage,
    CasosAbiertosPage
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
    CasosAbiertosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    CasosServiceProvider
  ]
})
export class AppModule {}
