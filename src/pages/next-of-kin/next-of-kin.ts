import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
/**
 * Generated class for the NextOfKinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next-of-kin',
  templateUrl: 'next-of-kin.html',
})
export class NextOfKinPage {

  nextofkinForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    ) {

      this.nextofkinForm = formBuilder.group({

        'name': ['', Validators.compose([Validators.required])],
        'surname': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required])],
        'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]{10}")])],
        'relationship': ['', Validators.compose([Validators.required])],
    


      })







  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextOfKinPage');
  }
 
  goMyaccount(){
    this.navCtrl.setRoot('MyaccountPage')
  }
  goEditsuccessfully(){
    this.navCtrl.setRoot('EditsuccessfullyPage')
  }


  
}
