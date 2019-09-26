import { Component, ViewChild } from '@angular/core';
import { Nav,  Platform, MenuController,  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder,} from '@angular/forms';
import {OneSignal} from '@ionic-native/onesignal/ngx';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  userId: string;
  [x: string]: any;
 

  menuForm: FormGroup;
  id: any;
  User_Id :any;
  user_id:any;


  @ViewChild(Nav) nav: Nav;
  username:any; 
  rootPage: any = 'HomePage';

  
  // menu: true;
 
  
 

  pages: Array<{ title: string, component: any , icon:string}>;


  constructor( public platform: Platform, 
    public statusBar: StatusBar, 
   
    public splashScreen: SplashScreen, 
    public menu: MenuController,
    private storage: Storage,
    private oneSignal: OneSignal,
    public formBuilder: FormBuilder,
    ) {



      this.storage.get('user_name').then((val) => {
        //console.log(String(val));
        this.username = String(val);  
      });
      this.storage.get('user_id').then((val) => {
       // console.log(String(val));
        this.userId = String(val);  
      });
   

      this.menuForm = formBuilder.group({
        'user_id': [''],
      })

    this.initializeApp(); {
      }

    // used for an example of ngFor and navigation
 
  

    
    this.pages = [
    ];
    

  }

  ionViewDidLoad() {

  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
        

        // window["plugins"].OneSignal.sendTag("user_id", this.userId);
        // console.log("tags sent");
        
        // this.oneSignal.getIds().then((id) => {
        //   console.log(id);
        //   let alert = this.alertCtrl.create({
        //       title: 'playerId',
        //       message: JSON.stringify(id),
        //       buttons: [{
        //         text: 'Ok',
        //         role: 'ok'
        //       }]
        //     });
        //     alert.present();
        // });
    

    });
  }

 

  goLogin(){
    // this.sideMenu.hide();
    this.nav.setRoot('LoginPage');
    // this.menu.enable(true);
    this.storage.clear();
    this.menu.close();
    }
  
  goHome(){
     // this.sideMenu.hide();
    this.nav.setRoot('HomePage');
    this.menu.enable(true);
    this.menu.close();
    }
  
  goHistory(){
 // this.sideMenu.hide();
    // this.nav.setRoot('HistoryPage');
    this.nav.setRoot("HistoryPage", {
      // user_id: this.User_Id,
    });
    this.menu.enable(true);
    this.menu.close();
    }
  
  // goMyAccount(){
  //    // this.sideMenu.hide();
  //   this.nav.setRoot('MyaccountPage');
  //   this.menu.enable(true);
  //   this.menu.close();
  //   }
  
  // goSupport(){
  //    // this.sideMenu.hide();

  //   this.nav.setRoot('SupportPage');
  //   this.menu.enable(true);
  //   this.menu.close();
  //   }

      
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
  
  
  goAbout(){
    this.nav.setRoot('AboutPage');
    this.menu.enable(true);
    this.menu.close();
    }

  goMyProfile(){
    this.nav.setRoot('MyprofilePage');
    this.menu.enable(true);
    this.menu.close();
    }


    
  
}



      