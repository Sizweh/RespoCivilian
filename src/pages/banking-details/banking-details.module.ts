import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankingDetailsPage } from './banking-details';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BankingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BankingDetailsPage),
    HttpClientModule,
  ],
})
export class BankingDetailsPageModule {}
