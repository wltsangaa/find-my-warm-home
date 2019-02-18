import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { getSegmentsFromNavGroups } from 'ionic-angular/umd/navigation/url-serializer';

@Component({
  selector: 'page-profile',
  templateUrl: 'Profile.html'
})
export class ProfilePage {
  uid: string;
  userProfilename: AngularFirestoreDocument<any>;
  register: Observable<any>;
  role: any;
  uemail: any;
  uname: any;
newname:any;
  constructor(public navCtrl: NavController,public authService: AuthService,
    public fireStore: AngularFirestore) {

  }

  ionViewDidLoad() {
    this.authService.user.subscribe(user=>{if(user)
      {this.uid=user.uid;
         
    this.userProfilename = this.fireStore.doc<any>('userProfile/'+ this.uid);
    this.register = this.userProfilename.valueChanges();
       this.register.subscribe(res=>{
    this.role = res.house;
    this.uemail = res.email;
    this.uname = res.username;
  });
      }
    else{console.log("not logined");}});

}

editname(){
  this.userProfilename.update({username:this.newname});

}
}
 