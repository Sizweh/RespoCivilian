import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';

@IonicPage()
@Component({
  selector: 'page-change',
  templateUrl: 'change.html',
})
export class ChangePage {
  changeForm: FormGroup;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public storage: Storage,
    private urlService: UrlbaseProvider,

     public navParams: NavParams) 
     {



      this.changeForm = formBuilder.group({
        'phone': ['', Validators.compose([Validators.required])],

      });

  }

  phone='';

  convert(){
    if(this.phone.substr(0,1)==='0'){
      this.phone='27'+this.phone.substr(1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePage');
  }


  goLogin(){
    const value = this.changeForm.value
    this.storage.set('phonenumber',value.phone).then(p=>{
      this.storage.get('userid').then(uid=>{

        this.urlService.changePhone(p,uid).subscribe(res=>{
          console.log(res)
        })

      })
      
    })

    this.navCtrl.push("VerifyAccountPage")




   // this.navCtrl.push("LoginPage");
  }

}
