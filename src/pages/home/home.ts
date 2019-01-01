import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { SignupPage } from '../signup/signup';
//import * as firebase from 'Firebase';
import 'firebase/firestore';
import { AngularFirestore }  from '@angular/fire/firestore';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	email:string;
  password:string;
  
  //ref = firebase.database().ref('userp/');
  hisdata:Observable<any[]>;
  items: Observable<any[]>;
  
  constructor(
    //public db: AngularFireDatabase,
    public navCtrl: NavController,
  public authService: AuthService,
  public fireStore: AngularFirestore
  ) {
    //this.items = db.list('chatrooms').valueChanges();
    


    
  }

  ionViewDidLoad(){
    this.hisdata = this.fireStore.collection<any>('historical_price', ref=>
    { ref.where("displaytext", "==", "hello");
    return ref;
  }).valueChanges();
  console.log(this.hisdata);
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
