import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ScrollHideConfig } from '../services/scroll-hide';

/**
 * Generated class for the FindPropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Property {
  displayText: string;
  price: number;
  totalFloors: number;
}

@Component({
  selector: 'page-find-property',
  templateUrl: 'find-property.html',
})
export class FindPropertyPage {

  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

  propertysCol: AngularFirestoreCollection<Property>;
  properties: Observable<Property[]>;
  items;
  filtereditems:any;
  searchTerm: string = '';
  filterPropertyName = this.db.collection('historical_price').doc("publicLocationNamesHk");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPropertyPage');
  }

  convert2Date(time:any){
    let newDate = new Date(+time);
    //const myFormattedDate = newDate.toDateString();
    return newDate; // JSON.stringify(newDate)
  }
  
  postTags(postTagsArray:any){
    for (let i = 0; i < postTagsArray.length; i++){
      if(postTagsArray[i].includes("校網") || postTagsArray[i].includes("indoor") || postTagsArray[i].includes("私人住宅")){
        postTagsArray.splice(i, 1);
      }
    }
    return postTagsArray;
  }

  gotoPropertyDetail(event, item:Observable<any[]>){
    this.navCtrl.push(PropertyDetailPage,{item:item});
  }

  findProperty(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.filtereditems=this.items.filter((item) => {
      //   return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      // }); 
      this.propertysCol = this.db.collection('historical_price', ref => ref.where("displayText", ">=", val).orderBy("displayText").startAt(val).endAt(val + "\uf8ff"));
      this.properties = this.propertysCol.valueChanges();
    }
  }

}
