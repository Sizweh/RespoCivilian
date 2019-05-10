import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectResponderPage } from './select-responder';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    SelectResponderPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectResponderPage),
    HttpClientModule,
    IonicStorageModule.forRoot(),

  ],
})
export class SelectResponderPageModule {}
