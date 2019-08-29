import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportPage } from './support';
import { PipesModule } from '../../pipes/pipes.module';
import { SocketIoModule, } from 'ng-socket-io';

@NgModule({
  declarations: [
    SupportPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportPage),
    SocketIoModule,
    PipesModule
  ],
})
export class SupportPageModule {}
