import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Nextofkin2Page } from './nextofkin2';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    Nextofkin2Page,
  ],
  imports: [
    IonicPageModule.forChild(Nextofkin2Page),
    IonicStorageModule.forRoot()
  ],
})
export class Nextofkin2PageModule {}
