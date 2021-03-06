import { Component, ViewChild } from '@angular/core';
import { Nav,  Platform, MenuController,  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  // menu: true;

  pages: Array<{ title: string, component: any , icon:string}>;

  constructor( public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
  
     
    ];
    
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.enable(true);
    });
  }

 

  goLogin(){
    // this.sideMenu.hide();
    this.nav.setRoot('LoginPage');
    this.menu.enable(true);
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
    this.nav.setRoot('HistoryPage');
    this.menu.enable(true);
    this.menu.close();
    }
  
  goMyAccount(){
     // this.sideMenu.hide();
    this.nav.setRoot('MyaccountPage');
    this.menu.enable(true);
    this.menu.close();
    }
  
  goSupport(){
     // this.sideMenu.hide();
    this.nav.setRoot('SupportPage');
    this.menu.enable(true);
    this.menu.close();
    }
  
  goAbout(){
    this.nav.setRoot('AboutPage');
    this.menu.enable(true);
    this.menu.close();
    }
  goMyProfile(){
    this.nav.push('MyprofilePage');
    this.menu.enable(true);
    this.menu.close();
    }
  
}


