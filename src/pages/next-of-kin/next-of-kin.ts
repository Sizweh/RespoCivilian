import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup,  } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { AlertsProvider } from './../../providers/alerts/alerts';


@IonicPage()
@Component({
  selector: 'page-next-of-kin',
  templateUrl: 'next-of-kin.html',
})
export class NextOfKinPage {
  remembertoken: boolean;
  nextofkinForm: FormGroup;
  UserId :any;
  Userdata: any;
  fullName:any;

  phonenumber:any;
  email:any;
  password:any;



  partial_membership:any;
  member_no:any;
  scheme_name:any;
  prefered_hospital:any;


  phone:any;
  relationship:any;
  name:any;
  surname:any;
  isChecked: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    private urlService: UrlbaseProvider,
    public alert: AlertsProvider,
   
    ) {

      this.nextofkinForm = formBuilder.group({

        'name': ['', Validators.compose([Validators.required])],
        'surname': ['', Validators.compose([Validators.required])],
        'phone': ['', Validators.compose([Validators.required])],
        'relationship': ['', Validators.compose([Validators.required])],
        'remembertoken': ['false', Validators.compose([Validators.requiredTrue])],
      
      })

  }

  onTermsChecked($event)
{
    if ( ! $event.checked)
    {
        this.nextofkinForm.patchValue({ termsAccepted: null });
    }
}


updateToken() {
  console.log('Remember token new state:' + this.remembertoken);
}

  tel='';
  convert(){
    if(this.tel.substr(0,1)==='0'){
      this.tel='27'+this.tel.substr(1);
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad NextOfKinPage');

  

    this.storage.get('name').then((val) => {
 
      this.name = val;
    });
    this.storage.get('surname').then((val) => {
      this.surname = val;
    })
    this.storage.get('phone').then((val) => {
      
      this.phone = val;
    });
    this.storage.get('relationship').then((val) => {
      
      this.relationship = val;
    });

    

    this.storage.get('fullName').then((val) => {
   
      this.fullName = val;
    });
    this.storage.get('email').then((val) => {
  
      this.email = val;
    });
    this.storage.get('phonenumber').then((val) => {
   
      this.phonenumber = val;
    });
    this.storage.get('password').then((val) => {
     
      this.password = val;
    });

      this.storage.get('member_no').then((val) => {
    
        this.member_no = val;
      }); 

      this.storage.get('scheme_name').then((val) => {
      
        this.scheme_name = val;
      });
    
      this.storage.get('partial_membership').then((val) => {
        
        this.partial_membership = val;
      });
    
      this.storage.get('prefered_hospital').then((val) => {
    
        this.prefered_hospital = val;
      });


    



}


goVerifyAccount(){

  const value = this.nextofkinForm.value;
   
  this.storage.set('name', value.name);
  this.storage.set('surname', value.surname);
  this.storage.set('phone', value.phone);
  this.storage.set('relationship', value.relationship);

  this.Userdata = {

  //nextofkin//
  name: value.name,
  surname: value.surname,
  phone:value.phone,
  relationship:value.relationship,
   //register//
   fullName: this.fullName,
   phonenumber: this.phonenumber,
   email: this.email,
   password:this.password,


//    //medical//
  scheme_name:this.scheme_name,
  member_no:this.member_no,
  partial_membership:this.partial_membership,
  prefered_hospital:this.prefered_hospital,



   

 }
 
  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json' );
     //THIS IS A BETTER WAY TO MAKE API CALLS
    this.urlService.register(this.Userdata)
    .subscribe(res => {
  this.alert.presentAlert("Notification", res.msg);
      if (res.status=='OK') {
      this.navCtrl.push("VerifyAccountPage");
      }
    }, (err) => {
      console.log(err);
    });

 
}

  
  goLogin(){
   this.navCtrl.setRoot('LoginPage')
  }


  goFaq(){
    this.navCtrl.push('FaqPage')
  }



  





}

























  