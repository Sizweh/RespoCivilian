import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,

  private transfer: FileTransfer,
  private camera: Camera,
    ) {
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
  goLogin(){

    const loading= this.loadingCtrl.create({
      content: "loging out...",
      duration: 3000
    });
    loading.present();
  this.navCtrl.setRoot('LoginPage')

  }

  


  goPersonalDetails(){
    this.navCtrl.push('PersonalDetailsPage')
  
    }

    goMedicalHistory(){
    this.navCtrl.push('MedicalHistoryPage')
  
    }

    goNextOfSkin(){
    this.navCtrl.push('NextOfSkinPage')
  
    }

    goBankDetails(){
    this.navCtrl.push('BankDetailsPage')
  
    }


}



