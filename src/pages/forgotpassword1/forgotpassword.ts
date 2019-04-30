import { Component, } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';






@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
   phone_number: string = "";
  create_password: string = "";
  confirm_password: string = "";










  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder, 
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    

     


    }
  
    






  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');{
      
    }
  
  }
  goLogin(){
    this.navCtrl.setRoot('LoginPage')
 


  }







   
  goForgotpassword2(){
    this.navCtrl.push('Forgotpassword2Page')
    if(this.phone_number=="0787463734"){
      const toast = this.toastCtrl.create({
        message: 'Password reset successfully',
        duration: 3000
      });
      toast.present();
    }else if (this.create_password=="12345"){}
    const toast = this.toastCtrl.create({
      message: 'Successfull...',
      duration: 8000
    });
    toast.present();



  }
}
