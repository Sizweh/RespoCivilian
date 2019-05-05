import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowdriversPage } from './showdrivers';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ShowdriversPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowdriversPage),
    IonicStorageModule.forRoot(),
    HttpClientModule,

  ],
})
export class ShowdriversPageModule {}
