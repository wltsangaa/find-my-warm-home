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
import { Platform } from 'ionic-angular';
import { ScrollHideConfig } from '../services/scroll-hide';


export interface User{
  username: any;
  email:string;
  house:string;}

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

  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

	email:string;
  password:string;
  
  //ref = firebase.database().ref('userp/');
  hisdata:Observable<any[]>;
  items:any;
  propertysCol: AngularFirestoreCollection<Property>;
  properties: Observable<Property[]>;
  ownpropertys: AngularFirestoreCollection<{}>;
  ownproperties: Observable<{}>;
  refprice: AngularFirestoreCollection<{}>;
  getrefprice: Observable<{}[]>;
  show: any;
  screensize: string;
  uid: string;
  verified: boolean;
  userProfilename: AngularFirestoreDocument<User>;
  register: any;
  role: any;
  uemail: any;
  uname: any;
  showt: number;
  userprofiles: AngularFirestoreCollection<{}>;
  getuserprofiles: Observable<{}[]>;
  ugender: any;
  uphotos: any;
  uinterest: any;
  
  constructor(
    //public db: AngularFireDatabase,
    public db: AngularFirestore,
    public navCtrl: NavController,
    public authService: AuthService,
    public plt: Platform,
    public fireStore: AngularFirestore,
  ) {
    //this.booksCollection = this.db.collection('historical_price');
    this.show = 10;
    this.showt = 10;

  }
  isstudent(){
    if(this.role == "tenant"){
      return true;
    }
    else{return false;}
    }

    switchRole(){
      if(this.role == "tenant"){
        this.role = "houseowner";
      }else{this.role = "tenant";}
    }
  ionViewDidLoad(){
    this.authService.user.subscribe(user=>{if(user)
      {this.uid=user.uid;
       this.verified =user.emailVerified;  

    this.userProfilename = this.fireStore.doc<User>('userProfile/'+ this.uid);
    this.register = this.userProfilename.valueChanges();
       this.register.subscribe(res=>{
    this.role = res.house;
    this.uemail = res.email;
    this.uname = res.username;
    this.ugender = res.gender;
    this.uinterest = res.interest;
    this.userprofiles = this.db.collection('userProfile', ref => ref.where('gender','==',this.ugender).limit(20));
    this.getuserprofiles = this.userprofiles.valueChanges();
    this.uphotos = res.photos;
  });}
    else{console.log("not logined");}});



 

    if (this.plt.is('android')||this.plt.is('cordova')||this.plt.is('ios')||this.plt.is('mobile')) {
      // This will only print when on iOS
      this.screensize = "1";
      console.log('I am mobile');
    }else {console.log('other platform')
      this.screensize ="2";}
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
    this.propertysCol = this.db.collection('historical_price', ref => ref.orderBy('dateCreated', 'desc').limit(20));
    this.properties = this.propertysCol.valueChanges();

    this.refprice = this.db.collection('reference_price');
    this.getrefprice = this.refprice.valueChanges(); 
    

  }
  showmore(show){ return show+= 10;}
colorup(badge:string, on:string="up", off:string="down"){
  if(badge.includes("+") == true)
  return on;
else return off;}
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

gotoUserDetail(event, item:Observable<any[]>){
  this.navCtrl.push(PropertyDetailPage,{item:item});
}

gotoFindProperty() {
  this.navCtrl.push(FindPropertyPage);
}

signup() {
  this.navCtrl.push(SignupPage);

  }

  login() {
    this.navCtrl.setRoot(LoginPage);   
    window.location.reload();
  }

  logout() {
    this.authService.logout();
  }

  gotopostproperty(){
    this.navCtrl.push(PostpropertyPage,{item:this.uinterest});
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
