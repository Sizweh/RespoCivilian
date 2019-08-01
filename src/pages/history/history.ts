import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';




@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  historyForm: FormGroup;
  // alert: any;
  history_collection: any;
  UserId :any;
  // user_id_server:any;
  // historyFormm: FormGroup;
  // get_history_data_Object:any ;
  // user_id_serve: null;


  emergency_type:any;
  Userdata: any;
  user_id: any;
  pick_up: any;
  toConcat:any;
  // promise1:any;
  // promise2:any;
  // var:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private storage: Storage,

    ) {

      this.storage.get('user_id').then((val) => {
        console.log(String(val));
        this.toConcat = this.UserId =String(val); 
      });

      this.historyForm = formBuilder.group({
        'user_id': ['',],
        
      })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage' );

this.storage.get('user_id').then((val) => {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
  //  const requestOptions = new RequestOptions({ headers: headers });
   
   //pass to back-end
    //  console.log(this.historyForm.value);
      var postData = {user_id:val};


      //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.history(postData)
    .subscribe(res => {
        // this.presentToast(res.msg, res.status);
       // console.log(res.id);
        //console.log(res.drop_off);
       // this.alert.presentAlert("Notification", res.msg);
     this.history_collection = res;
        if (res.status=='OK') {
          // localStorage.setItem('token', res.token);
          //this.navCtrl.setRoot('HomePage');
        }
    }, (err) => {
        console.log(err);
    });

     });
  }





  goHistory1(){
    console.log("uuuuuu");
 //   this.navCtrl.push('History1Page')
  }

 
}
