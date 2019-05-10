import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from './app.component';
import { Contacts } from '@ionic-native/contacts';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AuthProvider } from '../providers/auth/auth';
import { ToastProvider } from '../providers/toast/toast';
import { AlertsProvider } from '../providers/alerts/alerts';
import { PipesModule } from '../pipes/pipes.module';
import { UrlbaseProvider } from '../providers/urlbase/urlbase';

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    PipesModule,
   
    IonicModule.forRoot(MyApp, {

      mode: 'md'
    }),
    
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AlertsProvider,
    ToastProvider,
    CallNumber,
    Contacts,
    HttpModule,
    UrlbaseProvider,
    
  
  ]
})
export class AppModule {}



