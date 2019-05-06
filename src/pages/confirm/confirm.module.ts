import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPage } from './confirm';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    ConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPage),
    HttpClientModule,
    IonicStorageModule.forRoot()
 
  ],
})
export class ConfirmPageModule {}
