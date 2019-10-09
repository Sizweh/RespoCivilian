import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,  } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-my-beneficiaries',
  templateUrl: 'my-beneficiaries.html',
})
export class MyBeneficiariesPage {

  benForm: FormGroup;
  ben_collection: any;
  User_Id: any;
  id: any;
  user_id: any;
  phone: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    ) {

      
      // this.storage.get('user_id').then((val) => {
      //   this.user_Id = String(val);  
      // });

      // this.storage.get('id').then((val) => {
      //   this.id = String(val);  
      // });
      // this.storage.get('phone').then((val) => {
      //   this.phone = String(val);  
      // });


      this.id = navParams.get('data') ;
      this.User_Id = navParams.get('user_id') ;
      // this.id = navParams.get('id') ;
  
      this.benForm = formBuilder.group({

        // 'user_id': [this.User_ID,],
        'user_id': ['16'],
        // 'id': ['1'],
        
        // 'name': ['',],
        // 'phone': ['',],
      })
  }


  ionViewDidLoad() {

    // this.storage.get('user_id').then((result) => {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    var postData = this.benForm.value;

   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.viewbeneficiary(postData)
    .subscribe(res => {
     this.ben_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
      });
//  });


    console.log('ionViewDidLoad MyBeneficiariesPage');
  }





  // goForgotpassword(){
  //   this.navCtrl.push('ForgotpasswordPage')
  // }

  goBeneficiary(){
    this.storage.get('user_id').then((result) => {
    
       this.navCtrl.push("BeneficiaryPage", {
          user_id:result,
        });
    });
   }

   goForgotpassword(){
    this.storage.get('user_id').then((result) => {
    
       this.navCtrl.push("ForgotpasswordPage", {
          user_id:result,
        });
    });
   }

   goHome(id){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    
    var postData = { id:id }
    // var postData = this.skinForm.value;
    
      this.urlService.deleletbeneficiary(postData)
      .subscribe(res => {
      
       this.ben_collection = res;
          if (res.status=='OK') {
           }
      }, (err) => {
          console.log(err);
      });
    
        const confirm = this.alertCtrl.create({
          title: 'Are you sure?',
          message: '',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                this.storage.set('Medical_Aid_Status', 'Yes');
                console.log('Agree clicked'); 
                this.navCtrl.setRoot('HomePage'); 
              }
            },
            {
              text: 'No',
              handler: () => {
                this.storage.set('Medical_Aid_Status', 'No');
                console.log('Disagree clicked');
         
              }
            }
          ]
        });
        confirm.present();


    //this.navCtrl.setRoot('HomePage')
  }
        
}
