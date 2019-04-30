import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {
  tickets: string = "logfault";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ContactPage");
  }

  faultCategories = [
    {
      faultID: 1,
      category: "Heart Attack",
      imageUrl: "../../assets/icons/heart attack.png",
      icon: "alarm"
     
    },
    {
      faultID: 2,
      category: "Severe Bleeding",
      imageUrl: "../../assets/icons/severe bleeding.png",
      icon: "alarm"
    },
    {
      faultID: 3,
      category: "Burns",
      imageUrl: "../../assets/icons/burns.png",
      icon: "alarm"
    },
    {
      faultID: 4,
      category: "Difficult Breathing",
      imageUrl: "../../assets/icons/difficult breathing.png",
      icon: "alarm"
    },
    {
      faultID: 5,
      category: "Fainting",
      imageUrl: "../../assets/icons/fainting.png",
      icon: "alarm"
    },
    {
      faultID: 6,
      category: "Snake Bite",
      imageUrl: "../../assets/icons/snake bite.png",
      icon: "alarm"
    },
    {
      faultID: 7,
      category: "Vehicle Accident",
      imageUrl: "../../assets/icons/vehicle accident.png",
      icon: "alarm"
    },
    {
      faultID: 8,
      category: "Other",
      imageUrl: "../../assets/icons/other.png",
      icon: "alarm"
    }
  ];


  logsHistory = [
    {
      faultID: 1,
      category: "Roads",
      subject: "Damaged Roads",
      date: "12-02-2019",
      status: "Pending",
      city: "Durban",
      refNumber: "KZN-154256",
      imageUrl: "../../assets/icons/Group 606.png",
      map: " ../../assets/imgs/map.png",
      rating: "4",
      disputed: "0",
      icon: "alarm"
    },
    {
      faultID: 2,
      category: "Roads",
      subject: "Damaged Roads",
      date: "12-02-2019",
      status: "Pending",
      city: "Durban",
      refNumber: "KZN-154256",
      imageUrl: "../../assets/icons/Group 606.png",
      map: " ../../assets/imgs/map.png",
      rating: "2",
      disputed: "Yes",
      icon: "alarm"
    }
  ];

  faultData(category) {
    let faultDataModal = this.modalCtrl.create("FaultDataPage", {
      data: category
    });
    faultDataModal.present();
  }

  loggedFault(loggedfault) {
    let faultDataModal = this.modalCtrl.create("LoggedFaultDetailsPage", {
      data: loggedfault
    });
    faultDataModal.present();
  }

  viewComments() { }

  viewPlayers() { }
}