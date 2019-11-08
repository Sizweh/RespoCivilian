import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { OneSignal } from '@ionic-native/onesignal';
import { SocialSharing } from '@ionic-native/social-sharing';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  userId: string;
  [x: string]: any;

  url='https://respo.co.za/download/';
  text='Join South Africas official Medical Emergency App and request an ambulance at a click of a button! To download the Respo App go to https://respo.co.za/download/. At Respo your well being is our main priority!';
  message='Join South Africas official Medical Emergency App and request an ambulance at a click of a button! To download the Respo App go to https://respo.co.za/download/. At Respo your well being is our main priority!';
 

  id: any;
  User_Id :any;
  user_id:any;


  @ViewChild(Nav) nav: Nav;
  username:any; 
  rootPage: any = 'HomePage';

  
  
 

  pages: Array<{ title: string, component: any , icon:string}>;


  constructor( public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public menu: MenuController,
    private storage: Storage,
    private oneSignal: OneSignal,

    private socialSharing: SocialSharing
    ) {

      this.storage.get('user_name').then((val) => {
        this.username = String(val);  
      });
      this.storage.get('user_id').then((val) => {
        this.userId = String(val);  
      });
   



    this.initializeApp(); {
      }


 
  

    
    this.pages = [



    ];
    

  }

shareApp() {

this.socialSharing.share(this.text, this.message)
.then(()=>{

}).catch(()=>{

});

}

  ionViewDidLoad() {

  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.enable(true);
      
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
  

   //   Can only work when we compile for mobile and not on desktop
      window["plugins"].OneSignal
         .startInit("c92bb615-7c1e-4a91-8e4d-e4d3d771c165", "384977991016")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
        

 

    });
  }


  
  goHome(){

    this.nav.setRoot('HomePage');
    this.menu.enable(true);
    this.menu.close();
    }
  
  goHistory(){
    this.nav.setRoot("HistoryPage", {
    });
    this.menu.enable(true);
    this.menu.close();
    }
  

      
  goMyAccount(){

    this.storage.get('user_id').then((result) => {
      this.nav.setRoot("MyaccountPage", {
        user_id:result,
        id:result,
      });
  });
  this.menu.enable(true);
  this.menu.close();
      }
      goMyBeneficiaries(){

    this.storage.get('user_id').then((result) => {
      this.nav.setRoot("MyBeneficiariesPage", {
        user_id:result,

      });
  });
  this.menu.enable(true);
  this.menu.close();
      }
      
    goSupport(){

    this.storage.get('user_id').then((result) => {
      this.nav.setRoot("SupportPage", {
        user_id:result,
        id:result,
      });
  });
  this.menu.enable(true);
  this.menu.close();
      }
  
  


  goMyProfile(){
    this.nav.setRoot('MyprofilePage');
    this.menu.enable(true);
    this.menu.close();
    }





  
}



      