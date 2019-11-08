import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';




@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  historyForm: FormGroup;
  history_collection: any;
  UserId :any;
  emergency_type:any;
  Userdata: any;
  user_id: any;
  company_id: any;
  company_Id: any;
  pick_up: any;
  toConcat:any;
  User_Id :any;
    id: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private storage: Storage,

    ) {

      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
      this.company_Id = navParams.get('company_id') ;

   

      this.historyForm = formBuilder.group({
        'user_id': ['',],

        'myDate': ['',],


        
      })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage' );

this.storage.get('user_id').then((val) => {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

      var postData = {user_id:val};


      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.history(postData)
    .subscribe(res => {

     this.history_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });

     });
  }



  goHistory1(id, user_id, company_id ){ 
        
    this.navCtrl.push("History1Page", {
      data: id,
      user_id:user_id,
      company_id:company_id,

    });
 
    }

 
}
