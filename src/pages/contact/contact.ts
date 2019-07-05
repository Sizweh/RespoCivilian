import { Component } from "@angular/core";
import { IonicPage,NavController,NavParams, ModalController} from "ionic-angular";
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {

  UserId :any;
  toConcat:any;
  contactForm: FormGroup;
  contact_collection: any;
  
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder, 
   
    
  ) { 


    this.storage.get('user_id').then((val) => {
      console.log(String(val));
      this.  toConcat =   this.UserId =String(val);
    
      
    });
 
    this.contactForm = formBuilder.group({
      'user_id': ['3',],
    })


   }


   ionViewDidLoad() {
   

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);
      var postData = this.contactForm.value;



      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.contact(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
       // console.log(res.id);
        //console.log(res.drop_off);
       //// this.alert.presentAlert("Notification", res.msg);
     this.contact_collection = res;
        if (res.status=='OK') {
      //    this.storage.set('user_name', res.user_name);
        //  this.storage.set('user_id', res.user_id);
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('HomePage');
        }
    }, (err) => {
        console.log(err);
    });









  }







  




}