import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyLocationsPage } from './my-locations';

@NgModule({
  declarations: [
    MyLocationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyLocationsPage),
  ],
})
export class MyLocationsPageModule {}
