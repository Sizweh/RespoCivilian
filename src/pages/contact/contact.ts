import { Component } from "@angular/core";
import { IonicPage,NavController,NavParams, ModalController} from "ionic-angular";

import { AlertController, ToastController } from 'ionic-angular'


@IonicPage()
@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {

 
  
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController, 
    public toastCtrl: ToastController,
    
  ) {  }

  




}