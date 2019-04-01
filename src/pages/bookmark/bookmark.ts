import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ScrollHideConfig } from '../services/scroll-hide';
import { AuthService } from '../services/auth.service';

/**
 * Generated class for the BookmarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Property {
  comments: any;
  publicLocationNamesEn: string;
  team: any;
  displayText: string;
  price: number;
  totalFloors: number;
}

interface User {
  username: any;
  email: string;
  house: string;
}

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

  propertysCol: AngularFirestoreCollection<Property>;
  properties: Observable<Property[]>;
  filtereditems: any;
  uid: string;
  userProfilename: any;
  register: any;
  uname: any;
  yeah: any;
  joinedRoom: Array<boolean>;
  commented_propertysCol: AngularFirestoreCollection<Property>;
  commented_properties: Observable<Property[]>;
  commentedPost: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public db: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage');
    this.authService.user.subscribe(user => {
      if (user) {
      this.uid = user.uid;

        this.userProfilename = this.db.doc<User>('userProfile/' + this.uid);
        this.register = this.userProfilename.valueChanges();
        this.register.subscribe(res => {
          this.uname = res.username;
          console.log("uname = "+this.uname);
        });
      }
      else { console.log("not logined"); }
    });
    //this.findProperty();
  }

  ionViewDidEnter(){
    this.findProperty();
    this.findCommentedProperty();
  }

  convert2Date(time: any) {
    let newDate = new Date(+time);
    //const myFormattedDate = newDate.toDateString();
    return newDate; // JSON.stringify(newDate)
  }

  gotoPropertyDetail(event, item: Observable<any[]>) {
    this.navCtrl.push(PropertyDetailPage, { item: item });
  }

  findProperty() {
    // if the value is an empty string don't filter the items
    console.log("findProperty");
      this.propertysCol = this.db.collection('propertyProfile');
      this.properties = this.propertysCol.valueChanges();
      this.properties.subscribe(res => {
        //console.log(res);
        this.joinedRoom = [];
        res.forEach((element, index) => {
          if(element.team != null){
          element.team.forEach(element1 => {
            element1.teamname.forEach(element2 => {
              if(element2.who[1].includes(String(this.uname))){
                this.joinedRoom[index] = true;
                console.log(element.publicLocationNamesEn+": "+element2.who[1]);
              }
            });
          });
        }
        });
      });
  }

  findCommentedProperty() {
    // if the value is an empty string don't filter the items
    console.log("findCommentedProperty");
      this.commented_propertysCol = this.db.collection('propertyProfile');
      this.commented_properties = this.commented_propertysCol.valueChanges();
      this.commented_properties.subscribe(res => {
        //console.log(res);
        this.commentedPost = [];
        res.forEach((element, index) => {
          if(element.comments != null){
          element.comments.forEach(element1 => {
              if(element1.who[1].includes(String(this.uname))){
                this.commentedPost[index] = true;
                console.log(element.publicLocationNamesEn+": "+element1.who[1]);
              }
          });
        }
        });
      });
  }

}
