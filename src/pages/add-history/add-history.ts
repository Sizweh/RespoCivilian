import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-add-history',
  templateUrl: 'add-history.html',
})
export class AddHistoryPage {



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
   // private storage: Storage,
    public formBuilder: FormBuilder,
     //private geolocation: Geolocation,
    //  private urlService: UrlbaseProvider,
    ) {

  }

  ionViewDidEnter(){
  }


  ionViewDidLoad() {
  }


  goHome(){
  }





}
