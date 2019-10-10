import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBeneficiariesPage } from './my-beneficiaries';

@NgModule({
  declarations: [
    MyBeneficiariesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBeneficiariesPage),
  ],
})
export class MyBeneficiariesPageModule {}
