import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,} from '@angular/forms';
import { Storage } from '@ionic/storage';




@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {

  imageResponse: any;
  options: any;
  imageURI:any;
  imageFileName:any;

  profileForm: FormGroup;
  id: any;
  User_Id :any;
  user_id:any;
  profile_collection: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    private transfer: FileTransfer,
    private camera: Camera,
    ) {

  }
 

 
ionViewDidEnter()
{

}

  ionViewDidLoad() {

 this.storage.get('user_id').then((result) => {


   var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
 
   
   //pass to back-end
   console.log(result);
    var postData = {user_id:result}

    //THIS IS A BETTER WAY TO MAKE API CALLS
  this.urlService.personalDetails(postData)
  .subscribe(res => {
      
   this.profile_collection = res;
      if (res.status=='OK') {
    
       // this.storage.set('user_idss', res.user_id);
       
       }
  }, (err) => {
      console.log(err);
  });

 });



  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
     // this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://46.101.169.33:/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://46.101.169.33:/static/images/ionicfile.jpg"
      loader.dismiss();
      //this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      //this.presentToast(err);
    });
  }

  goHome(){
  this.navCtrl.setRoot('HomePage')

  }
  goLogin(user_id){

    const loading= this.loadingCtrl.create({
      content: "logging out...",
      duration: 2000
    });
    loading.present();

    this.storage.clear();
   this.navCtrl.setRoot('LoginPage')

  }

  
  goPersonalDetails(){

  this.storage.get('user_id').then((result) => {

    this.navCtrl.push("PersonalDetailsPage", {
      user_id:result,
    });
});
    
    }

    goMedicalHistory(user_id){
this.storage.get('user_id').then((result) => {

   this.navCtrl.push("MedicalHistoryPage", {
      user_id:result,
    });
});

    
    }

    goNextOfSkin(){
this.storage.get('user_id').then((result) => {

   this.navCtrl.push("NextOfSkinPage", {
      user_id:result,
    });
});
    }

    goChangePassword(){
this.storage.get('user_id').then((result) => {

   this.navCtrl.push("ChangePasswordPage", {
      user_id:result,
    });
});
    }

    // goChangePassword(){
    // this.navCtrl.push('ChangePasswordPage')
  
    // }
   

}



