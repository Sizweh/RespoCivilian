import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeneficiaryPage } from './beneficiary';

@NgModule({
  declarations: [
    BeneficiaryPage,
  ],
  imports: [
    IonicPageModule.forChild(BeneficiaryPage),
  ],
})
export class BeneficiaryPageModule {}
