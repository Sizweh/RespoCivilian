import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForSelfPage } from './for-self';

@NgModule({
  declarations: [
    ForSelfPage,
  ],
  imports: [
    IonicPageModule.forChild(ForSelfPage),
  ],
})
export class ForSelfPageModule {}
