import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PhotoViewer } from '@ionic-native/photo-viewer/';


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
  
  uname: any;
  propertyP: Observable<any>;
  comment: any;
  newmessage:string;
  nooftenants: any;
  teams: any;
  lock: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthService,
    public fireStore: AngularFirestore,
    private photoViewer: PhotoViewer) {
	  
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
    this.lock = this.navParams.get('item').lock;

    console.log(this.comment);

      //property id
    this.pid = this.navParams.get('item').agreementId;

    this.teams = this.navParams.get('item').team;
    //get current user id
    
    
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

showImage(imgLink:string){
  this.photoViewer.show(imgLink);
}

isstudent(){
if(this.role == "tenant"){
  return true;
}
else{return false;}
}
createroom(){

  if(this.teams != null)
  this.teams.push({teamname:[{ who: [this.uemail,this.uname], when: new Date().getTime() }],select:false});
  else this.teams = [{teamname:[{ who: [this.uemail,this.uname], when: new Date().getTime() }],select:false}];
  this.propertyProfilename.update({team:this.teams});
  console.log(this.teams);
}
joinroom(index :number){
  if(this.inpeoplelist(this.teams[index].teamname) == true && this.enoughplace(this.teams[index].teamname.length) == true){
    console.error(this.teams[index].teamname.length);
  this.teams[index].teamname.push({ who: [this.uemail,this.uname], when: new Date().getTime() });
  console.log(this.teams);
    this.propertyProfilename.update({team:this.teams});
}
else{
  console.log("aleady added to the list");
  console.log(this.teams);
}

  //this.propertyProfilename.update({peoplelist:this.peoplelist});

}
//check if that person is in the list
inpeoplelist(list:any):boolean{
  if(list != null){
  let inpeople = list.find((e: { who: string[], when:  Date; })=>{return e.who[0] == this.uemail;});
console.log(inpeople);
if(inpeople != null){
  return true;
}
else{return false;}}
else{return true;}

}
//check if there is enough place
enoughplace(length:number):boolean{

  if(this.nooftenants != null){
    if(this.nooftenants>length)
    return true;
    else return false;
}
else{return false;}
}

addcomment(){
  if(this.comment != null)
  {this.comment.push({ who: [this.uemail,this.uname], when: new Date().getTime(), message: this.newmessage });
}
else{this.comment = ({ who: [this.uemail,this.uname], when: new Date().getTime(), message: this.newmessage });}
console.log(this.comment);
  this.propertyProfilename.update({comments:this.comment});
  this.newmessage = null;
}

showconfirm(){
  if(this.uid!=null || this.landornot != null)
  {if(this.uid == this.landornot)
    return true;
    else return false;}

  else return false;
}
clickconfirm(){
  this.lock = !this.lock;
  this.propertyProfilename.update({lock:this.lock});
}
checklock(){
  if(this.lock == null)
  return  true;
else return this.lock;
}

chooseteam(index:number){
  if(this.teams!=null){
    
  this.teams[index].select = !this.teams[index].select;
    
    this.propertyProfilename.update({team:this.teams});
  }
}
showtick(index:number){
  if(this.teams!=null){
    
  return this.teams[index].select;
    
  }
  else return false;
}
ionViewWillLeave(){
  

}
}

