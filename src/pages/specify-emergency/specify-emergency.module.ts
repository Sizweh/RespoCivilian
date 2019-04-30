import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecifyEmergencyPage } from './specify-emergency';

@NgModule({
  declarations: [
    SpecifyEmergencyPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecifyEmergencyPage),
  ],
})
export class SpecifyEmergencyPageModule {}
