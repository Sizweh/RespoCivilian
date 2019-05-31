import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfAdmissionPage } from './self-admission';

@NgModule({
  declarations: [
    SelfAdmissionPage,
  ],
  imports: [
    IonicPageModule.forChild(SelfAdmissionPage),
  ],
})
export class SelfAdmissionPageModule {}
