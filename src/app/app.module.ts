import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,  CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from './app.component';
import { Contacts } from '@ionic-native/contacts';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';

import { ToastProvider } from '../providers/toast/toast';
import { AlertsProvider } from '../providers/alerts/alerts';
import { PipesModule } from '../pipes/pipes.module';
import { UrlbaseProvider } from '../providers/urlbase/urlbase';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicStorageModule } from '@ionic/storage';
// import { FileChooser } from '@ionic-native/file-chooser';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file/ngx';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { SocketsProvider } from '../providers/sockets/sockets';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { OneSignal } from '@ionic-native/onesignal/ngx'
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';

const config: SocketIoConfig = { url: 'http://localhost:3001', options:{}};


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
     
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot()
    
  
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , 

    
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
    ImagePicker,
    // FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

   
    AlertsProvider,
    ToastProvider,
    CallNumber,
    Contacts,
    // HttpModule,
    UrlbaseProvider,
    // Camera,
    // FileTransfer,
    // File,
    SocketsProvider,
    
    HttpModule,
    SocketsProvider,
 
  
  
  ]
})
export class AppModule {}



