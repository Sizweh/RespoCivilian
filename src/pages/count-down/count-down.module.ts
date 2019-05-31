import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountDownPage } from './count-down';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    CountDownPage,
  ],
  imports: [
    IonicPageModule.forChild(CountDownPage),
    IonicStorageModule.forRoot(),
  ],
})
export class CountDownPageModule {}
