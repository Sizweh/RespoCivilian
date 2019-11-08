import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { ToastProvider } from '../providers/toast/toast';
import { AlertsProvider } from '../providers/alerts/alerts';
import { PipesModule } from '../pipes/pipes.module';
import { UrlbaseProvider } from '../providers/urlbase/urlbase';

import { IonicStorageModule } from '@ionic/storage';



import { SelectSearchableModule } from 'ionic-select-searchable';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Network } from '@ionic-native/network';





@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    PipesModule,
    SelectSearchableModule,
    IonicModule.forRoot(MyApp, {
    
      mode: 'md'
    }),
    HttpClientModule,
     

    IonicStorageModule.forRoot()
    
  
  ],

    



  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [
    StatusBar,
    Geolocation,
   
    SocialSharing,
    SplashScreen,
    OneSignal,

    Network,

    {provide: ErrorHandler, useClass: IonicErrorHandler},

   
    AlertsProvider,
    ToastProvider,
    CallNumber,
 
    UrlbaseProvider,


    HttpModule,

 
 
  
  
  ]
})
export class AppModule {}



