import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRegistrationPage } from './edit-registration';

@NgModule({
  declarations: [
    EditRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(EditRegistrationPage),
  ],
})
export class EditRegistrationPageModule {}
