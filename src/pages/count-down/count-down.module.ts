import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountDownPage } from './count-down';

@NgModule({
  declarations: [
    CountDownPage,
  ],
  imports: [
    IonicPageModule.forChild(CountDownPage),
  ],
})
export class CountDownPageModule {}
