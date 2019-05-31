import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForSomeonePage } from './for-someone';

@NgModule({
  declarations: [
    ForSomeonePage,
  ],
  imports: [
    IonicPageModule.forChild(ForSomeonePage),
  ],
})
export class ForSomeonePageModule {}
