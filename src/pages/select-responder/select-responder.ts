import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UrlbaseProvider } from './../../providers/urlbase/urlbase';
import { FormGroup, FormBuilder} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-select-responder',
  templateUrl: 'select-responder.html',
})
export class SelectResponderPage {
  allResponders: any[];
  additional_address: any;
  address: any;

  responder_positions :any[]=[];
  allResponders_Distance : any[]=[];
  myInput :'';

  responderName: any;
  responderForm: FormGroup;
  userDetails: {};
  L: any;
  Ln: any;
  dist: any[]=[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private urlService: UrlbaseProvider,
    public formBuilder: FormBuilder,
    ) {


  }

  ionViewDidLoad() {

     this.storage.get('lat').then((la) => {
        this.storage.get('lng').then((ln) => {
          this.urlService.sendList({'lat':la,'lon':ln})
    .subscribe(res => {
     this.allResponders_Distance = res;
        if (res.status=='OK') {
        }
    }, (err) => {
        console.log(err);
    });  
      });
      });
  }


  
  
  goLocation(respo) {
    this.storage.set('selected_responder', respo);
    this.navCtrl.push('LocationPage')
  }


search(){

this.storage.get('lat').then((la) => {
 this.storage.get('lng').then((ln) => {
   this.urlService.search({'name':this.myInput, 'lat':la,'lon':ln})
    .subscribe(res => {
     this.allResponders_Distance = res;
        if (res.status=='OK') {
        }
    }, (err) => {

        console.log(err);
    });
  });
  });

}







  

}


















