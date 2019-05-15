import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPasswordPage } from './reset-password';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordPage),
    IonicStorageModule.forRoot()

  ],
})
export class ResetPasswordPageModule {}
