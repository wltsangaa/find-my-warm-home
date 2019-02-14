import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { getSegmentsFromNavGroups } from 'ionic-angular/umd/navigation/url-serializer';

export interface User{
  username: any;email:string;
  house:string;}
  
  
@Component({
  selector: 'page-property-detail',
  templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {

value:Observable<any[]>;
name:string;
landornot:string;

uid:string;
  userProfileCollectionemailname: any;
  userProfilename: AngularFirestoreDocument<User>;
  register: Observable<User>;
  role: string;
  peoplelist:any[];
  pid: string;
  propertyProfilename: AngularFirestoreDocument<any>;
  uemail: string;
  inpeople: any;
  uname: any;
  propertyP: Observable<any>;
  comment: any;
  newmessage:string;
  nooftenants: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthService,
    public fireStore: AngularFirestore,) {
	  
	  this.value = this.navParams.get('item');
	  //showing we can get the values inside the observable
    //this.name = this.navParams.get('item').displayText;

    //only those properties posted by our landlords have the uid
    //used to determine if the item is history
    this.landornot = this.navParams.get('item').uid;
    //console.log(this.name);
    console.log(this.landornot);

    this.peoplelist = this.navParams.get('item').peoplelist;
    console.log(this.peoplelist);
    
    this.nooftenants = this.navParams.get('item').nooftenant;

    this.comment = this.navParams.get('item').comments;
    console.log(this.comment);

      //property id
    this.pid = this.navParams.get('item').agreementId;


    //get current user id
    
    this.inpeople = null;
   }
  
  ionViewDidLoad() {
    this.authService.user.subscribe(user=>{if(user)
      {this.uid=user.uid;
         
    this.userProfilename = this.fireStore.doc<User>('userProfile/'+ this.uid);
    this.register = this.userProfilename.valueChanges();
       this.register.subscribe(res=>{
    this.role = res.house;
    this.uemail = res.email;
    this.uname = res.username;
  });
      }
    else{console.log("not logined");}});
    //this.userProfilename = this.fireStore.doc<User>('userProfile/'+ this.uid);
    //this.register = this.userProfilename.valueChanges();
    //   this.register.subscribe(res=>{
    //this.role = res.house;
    //this.uemail = res.email;
    //this.uname = res.username;
  //});

  this.propertyProfilename = this.fireStore.doc<any>('propertyProfile/'+ this.pid);
  
  }
  ionViewWillLoad() {
    console.log(this.uid);


  }
logged(){if(this.uname == null)
return false;
else{return true;}}

fromlandlord(){

 
if(this.landornot == null)
return false;
else return true;
}



isstudent(){
if(this.role == "tenant"){
  return true;
}
else{return false;}
}

joinroom(){
  if(this.inpeoplelist() == false){
    
  this.peoplelist.push({ who: [this.uemail,this.uname], when: new Date().getTime() });
  console.log(this.peoplelist);
    this.propertyProfilename.update({peoplelist:this.peoplelist});
}
else{
  console.log("aleady added to the list");
  console.log(this.peoplelist);
}

  //this.propertyProfilename.update({peoplelist:this.peoplelist});

}
//check if that person is in the list
inpeoplelist():boolean{
  if(this.peoplelist != null){
  this.inpeople = this.peoplelist.find(e=>{return e.who[0] == this.uemail;});
console.log(this.inpeople);
if(this.inpeople != null){
  return true;
}
else{return false;}}
else{return true;}

}
//check if there is enough place
enoughplace():boolean{

  if(this.peoplelist != null && this.nooftenants != null){
    if(this.nooftenants>this.peoplelist.length-1)
    return true;
    else return false;
}
else{return false;}
}

addcomment(){
  this.comment.push({ who: [this.uemail,this.uname], when: new Date().getTime(), message: this.newmessage });
  console.log(this.comment);
  this.propertyProfilename.update({comments:this.comment});
  this.newmessage = null;
}
ionViewWillLeave(){
  

}
}

