import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Forgotpassword2Page } from './forgotpassword2';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    Forgotpassword2Page,
  ],
  imports: [
    IonicPageModule.forChild(Forgotpassword2Page),
    IonicStorageModule.forRoot(),
  ],
})
export class Forgotpassword2PageModule {}
