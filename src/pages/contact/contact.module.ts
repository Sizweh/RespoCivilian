import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


import { ContactPage } from './contact';
import { PipesModule } from '../../pipes/pipes.module';
import { SocketIoModule } from 'ng-socket-io';



@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
    SocketIoModule,
    PipesModule

   
   
  ],

  exports: [

  ]




})
export class ContactPageModule {}
