import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasoPage } from './caso';

@NgModule({
  declarations: [
    CasoPage,
  ],
  imports: [
    IonicPageModule.forChild(CasoPage),
  ],
})
export class CasoPageModule {}
