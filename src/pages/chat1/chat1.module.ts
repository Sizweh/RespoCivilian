import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chat1Page } from './chat1';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [
    Chat1Page,
  ],
  imports: [
    IonicPageModule.forChild(Chat1Page),
    PipesModule
  ],
})
export class Chat1PageModule {}
