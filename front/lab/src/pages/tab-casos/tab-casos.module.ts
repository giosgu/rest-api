import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabCasosPage } from './tab-casos';

@NgModule({
  declarations: [
    TabCasosPage,
  ],
  imports: [
    IonicPageModule.forChild(TabCasosPage),
  ],
})
export class TabCasosPageModule {}
