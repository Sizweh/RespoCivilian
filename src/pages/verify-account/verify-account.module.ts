import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyAccountPage } from './verify-account';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    VerifyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyAccountPage),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
})
export class VerifyAccountPageModule {}
