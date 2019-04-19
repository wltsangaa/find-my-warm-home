import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

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

  propertysCol: AngularFirestoreCollection<Property>;
  properties: Observable<Property[]>;
  properties2: any;
  tenants:any;
  items;
  filtereditems:any;
  searchTerm: string ;
  searchType: string;
  choseother:boolean;
  location:string;
  price:number;
  ourproperty: any;
  interest: any;
  gender: any;
  ourpropertyCol: any
  //filterPropertyName = this.db.collection('historical_price').doc("publicLocationNamesHk");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    ) {
      this.searchType = "nowproperty";
      this.choseother = true;
      this.location = "";
      this.price = 0;
  }
showad(){
  this.choseother = !this.choseother;
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
      if(postTagsArray[i].includes("校網") || postTagsArray[i].includes("indoor") 
      || postTagsArray[i].includes("私人住宅") || postTagsArray[i].includes("floorplan")
      || postTagsArray[i].includes("photo")
      || postTagsArray[i].includes("有匙")
      || postTagsArray[i].includes("vr360")
      ){
        postTagsArray.splice(i, 1,"");
      }
    }
    return postTagsArray;
  }

  gotoPropertyDetail(event, item:Observable<any[]>){
    this.navCtrl.push(PropertyDetailPage,{item:item});
  }

  findProperty(ev, tablename, fieldname, order) {
    // set val to the value of the ev target
    var val:string = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.filtereditems=this.items.filter((item) => {
      //   return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      // }); 
      if(tablename == "historical_price1")
      {let tname = tablename.slice(0, -1);
        this.propertysCol = this.db.collection(tname, ref => ref.limit(50).orderBy(fieldname).orderBy(order,'desc').startAt(val).endAt(val + "\uf8ff"));
      this.properties = this.propertysCol.valueChanges();
    }
    else if(tablename == "historical_price2"){
      let tname2 = tablename.slice(0, -1);
      let val2 = val.toUpperCase();
      this.properties2 = this.db.collection(tname2, ref => ref.limit(50).orderBy(fieldname).orderBy(order,'desc').startAt(val2).endAt(val2 + "\uf8ff")).valueChanges();
    }
    else if(tablename == "userProfile"){
      this.tenants = this.db.collection(tablename, ref => ref.orderBy(fieldname).orderBy(order).startAt(val).endAt(val + "\uf8ff")).valueChanges();
    }
    else if (tablename == "propertyProfile")
    {
      this.ourproperty = this.db.collection(tablename, ref => ref.orderBy(fieldname).orderBy(order).startAt(val).endAt(val + "\uf8ff")).valueChanges();
    }
    }
  }
  // findProperty2() {
  //   // set val to the value of the ev target
    

  //   // if the value is an empty string don't filter the items
  //   if (this.price > 0 && this.location.trim() && this.location != ''  ) {
  //     // this.filtereditems=this.items.filter((item) => {
  //     //   return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
  //     // }); 
  //     this.propertysCol = this.db.collection('historical_price', ref => ref.limit(50).where("price", ">=", Number(this.price))
  //     .where("publicLocationNamesEn","array-contains",this.location).orderBy("price").orderBy("dateCreated", 'desc'));
  //     this.properties = this.propertysCol.valueChanges();
  //   }
  // }
  findProperty2() {
    // set val to the value of the ev target
    

    // if the value is an empty string don't filter the items
    if (this.location.trim() && this.location != ''  ) {
      // this.filtereditems=this.items.filter((item) => {
      //   return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      // }); 
      this.propertysCol = this.db.collection('historical_price', ref => ref.limit(50)
      .where("publicLocationNamesEn","array-contains",this.location).orderBy("dateCreated", 'desc'));
      console.log(this.location);
      this.properties = this.propertysCol.valueChanges();
    }
  }
  findOurproperty(){
    if (this.location.trim() && this.location != ''  ) {
      // this.filtereditems=this.items.filter((item) => {
      //   return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      // }); 
      this.ourpropertyCol = this.db.collection('propertyProfile', ref => ref.where("price", ">=", Number(this.price))
      .where("publicLocationNamesEn","array-contains",this.location).orderBy("price").orderBy("dateCreated", 'desc'));
      
      this.ourproperty = this.ourpropertyCol.valueChanges();
    }

  }
  
  findMate(){
    if (this.interest != '' && this.gender.trim() && this.gender != '' ) {
      // this.filtereditems=this.items.filter((item) => {
      //   return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      // }); 
      this.tenants = this.db.collection('userProfile', ref => ref.limit(50).where("interest","==",this.interest)
      .where("gender","==",this.gender).orderBy("price")).valueChanges();
      
    }

  }
}
