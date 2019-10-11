import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,  FormBuilder} from '@angular/forms'; 
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from '../../providers/urlbase/urlbase';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-bank-details',
  templateUrl: 'bank-details.html',
})
export class BankDetailsPage {

 bankingForm: FormGroup;
  ben_collection: any;
  benForm: any;
  id: any;
  User_Id: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,

    ) {

      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
  
      this.benForm = formBuilder.group({

        // 'user_id': [this.User_ID,],
        'user_id': ['16'],
        
        'name': ['',],
        'phone': ['',],
      })




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankDetailsPage');
  }

}
