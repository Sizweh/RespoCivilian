import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMedicalAidPage } from './add-medical-aid';

@NgModule({
  declarations: [
    AddMedicalAidPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMedicalAidPage),
  ],
})
export class AddMedicalAidPageModule {}
