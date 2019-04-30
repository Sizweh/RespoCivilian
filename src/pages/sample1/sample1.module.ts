import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sample1Page } from './sample1';

@NgModule({
  declarations: [
    Sample1Page,
  ],
  imports: [
    IonicPageModule.forChild(Sample1Page),
  ],
})
export class Sample1PageModule {}
