import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArrivalPage } from './arrival';

@NgModule({
  declarations: [
    ArrivalPage,
  ],
  imports: [
    IonicPageModule.forChild(ArrivalPage),
  ],
})
export class ArrivalPageModule {}
