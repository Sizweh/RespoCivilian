import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,  } from '@angular/forms';




@IonicPage()
@Component({
  selector: 'page-self-admission',
  templateUrl: 'self-admission.html',
})
export class SelfAdmissionPage {


  beneficiaryForm: FormGroup;
  ben_collection: any[];
  user_Id: string;
  id: any;
  name: any;
  Beneficiary_id: any;
  user_id: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    public storage: Storage,
    private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    ) {

      this.storage.get('user_id').then((val) => {
        this.user_Id = String(val);

      });
      this.id = navParams.get('data') ;
      this.user_Id = navParams.get('user_id') ;

      this.beneficiaryForm = formBuilder.group({

      'user_id': [this.user_Id,],
        'Beneficiary_id': ['',],
      })

  }



  ionViewDidLoad() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    var postData = this.beneficiaryForm.value;

   //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.viewbeneficiary(postData)
    .subscribe(res => {
     this.ben_collection = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
      });
      
    console.log('ionViewDidLoad SelfAdmissionPage');
  }

goMaps2(){
this.storage.set('forWho', 'FM');
console.log('for me clicked');  
this.navCtrl.push("MapsPage");
}


goMaps(){
  this.storage.set('forWho', 'FS');
  console.log('for someone clicked'); 
this.navCtrl.push("MapsPage");
}

goChat2(){
     this.storage.set('forWho', 'FB');
    

  let opt =[];

  this.ben_collection.forEach((ben,index)=>{

    let inp ={
      name: 'radio1',
      type: 'radio',
      label: ben.name,
      value: ben.id,
    
    };

    opt[index] =inp;

    
    
  });
  console.log(opt);

  

    const alert = this.alertCtrl.create({
  
    inputs:
     opt
    ,
    buttons: 
    


    [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: (e) => {     
          const value = this.beneficiaryForm.value;
          this.storage.set('Beneficiary_id', (e));
          console.log(e);
   

         this.navCtrl.push("MapsPage");
       
        
         
            
        }
        
   
      }
    ]
  });


 alert.present();







}








}


