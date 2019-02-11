import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { SignupPage } from '../signup/signup';
//import * as firebase from 'Firebase';
import 'firebase/firestore';
//import { AngularFirestore }  from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { DatePipe } from '@angular/common';
import { PropertyDetailPage } from '../property-detail/property-detail';
import { FindPropertyPage } from '../find-property/find-property';
import { PostpropertyPage} from '../postproperty/postproperty';

interface Property {
  displayText: string;
  price: number;
  totalFloors: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	email:string;
  password:string;
  
  
  //ref = firebase.database().ref('userp/');
  hisdata:Observable<any[]>;
  items:any;
  propertysCol: AngularFirestoreCollection<Property>;
  properties: Observable<Property[]>;
  ownpropertys: AngularFirestoreCollection<{}>;
  ownproperties: Observable<{}>;
  
  constructor(
    //public db: AngularFireDatabase,
    public db: AngularFirestore,
    public navCtrl: NavController,
    public authService: AuthService,
  ) {
    //this.booksCollection = this.db.collection('historical_price');
  }

  ionViewDidLoad(){
    // this.hisdata = this.db.collection('historical_price').valueChanges();
    // this.hisdata = this.db.collection<any>
    // ('historical_price', ref=>ref.where("totalFloors", "==", "1")).valueChanges();
    //this.hisdata = this.db.collection('historical_price', ref => ref.orderBy('price', 'desc').limit(5)).valueChanges();
    //this.hisdata = this.db.collection('historical_price', ref => ref.where("totalFloors", "==", "1")).valueChanges();
    //getPropertyList();
    //this.propertysCol = this.db.collection('historical_price');
    let floor:number = 1;
    
    // testing
    // this.propertysCol = this.db.collection('historical_price', ref => ref.where('totalFloors', '==', floor));
    this.ownpropertys = this.db.collection('propertyProfile');
    this.ownproperties = this.ownpropertys.valueChanges();
    
    // search filter -- timestamp(desc)
    this.propertysCol = this.db.collection('historical_price', ref => ref.orderBy('dateCreated', 'desc').limit(5));

    this.properties = this.propertysCol.valueChanges();
  }

getPropertyList(){
  return this.hisdata = this.db.collection('historical_price', ref => ref.where("totalFloors", "==", "1")).valueChanges();
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

gotoFindProperty() {
  this.navCtrl.push(FindPropertyPage);
}

signup() {
  this.navCtrl.push(SignupPage);

  }

  login() {
    this.navCtrl.push(LoginPage);   
  }

  logout() {
    this.authService.logout();
  }

  gotopostproperty(){
    this.navCtrl.push(PostpropertyPage);
  }
  
  // this.router.navigate(['/detail/'+newInfo.key]);
  // this.ref
  // .push( {email:this.email});
  // this.navCtrl.push(SignupPage);
    //this.authService.signup(this.email, this.password);
	
    //this.email = this.password = '';
  
/*
  signup2() {
    this.authService.signup2(this.email, this.password);
	
    this.email = this.password = '';
  }
  
  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.authService.logout();
  }
  */
  
}
