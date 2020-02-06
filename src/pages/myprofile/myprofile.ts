import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, LoadingController, MenuController  } from 'ionic-angular';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder,} from '@angular/forms';
import { Storage } from '@ionic/storage';
// import { PhotoLibrary } from '@ionic-native/photo-library';
// import { ImagePicker } from '@ionic-native/image-picker';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { FileOpener } from '@ionic-native/file-opener';


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
  photoSrc:any;
  base64Image:string;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:  AlertController,
    private urlService: UrlbaseProvider,
    private storage: Storage,
    public formBuilder: FormBuilder,
    // private photoLibrary: PhotoLibrary,
    //private imagePicker: ImagePicker,
    public menuCtrl: MenuController,
    // private fileOpener: FileOpener,
    // private camera: Camera
    ) {

  }

  ionViewDidEnter() {

 this.storage.get('user_id').then((result) => {
   var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    var postData = {user_id:result}

  //THIS IS A BETTER WAY TO MAKE API CALLS
  this.urlService.personalDetails(postData)
  .subscribe(res => {
   this.profile_collection = res;
      if (res.status=='OK') {
       }
  }, (err) => {
      console.log(err);
     });
 });


}

  
  goLogin(){

    const loading= this.loadingCtrl.create({
      content: "logging out...",
      duration: 2000
    });
    loading.present();

    this.storage.clear();
    this.menuCtrl.enable(false);
   this.navCtrl.setRoot('LoginPage')

  }

  
  goPersonalDetails(){

  this.storage.get('user_id').then((result) => {

    this.navCtrl.push("PersonalDetailsPage", {
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


  openLibrary() {


  

    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    // }

    // var options:any;

    // this.camera.getPicture(options).then((imageData) => {

    //     this.base64Image  = 'data:image/jpg;base64,' + imageData;
    //     this.fileOpener.open('data:image/jpg;base64,', 'base64Image');
          
    // }, (err) => { 

    // });

    // this.photoLibrary.requestAuthorization().then(() => {
    //   this.photoLibrary.getLibrary().subscribe({
    //     next: library => {
    //       library.forEach(function(libraryItem) {
    //         console.log(libraryItem.id);          // ID of the photo
    //         console.log(libraryItem.photoURL);    // Cross-platform access to photo
    //         console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
    //         console.log(libraryItem.fileName);
    //         console.log(libraryItem.width);
    //         console.log(libraryItem.height);
    //         console.log(libraryItem.creationDate);
    //         console.log(libraryItem.latitude);
    //         console.log(libraryItem.longitude);
    //         console.log(libraryItem.albumIds);   
    //       });
    //     },
    //     error: err => { console.log('could not get photos'); },
    //     complete: () => { console.log('done getting photos'); }
    //   });
    // })
    // .catch(err => console.log('permissions weren\'t granted'));


  }



    
   
 

}



