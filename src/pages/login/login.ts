import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

import {  FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email:string;
	password:string;
	
  items: Observable<any[]>;
  validations_form: FormGroup;
  errorMessage: string;
  loading: boolean;



  constructor(
    //public db: AngularFireDatabase,
    public navCtrl: NavController,
  public authService: AuthService
 // ,public formBuilder: FormBuilder
  ) {
    this.loading = false;
    //this.items = db.list('chatrooms').valueChanges();
  }

  ionViewDidLoad() {
    this.loading = true;
    //window.location.reload();
    this.authService.user.subscribe(user=>{if(user)
      {
        //this.navCtrl.setRoot(TabsPage);
      }
    else{this.loading = false;
      console.log("not logined");}});
    //this.userProfilename = this.fireStore.doc<User>('userProfile/'+ this.uid);
    //this.register = this.userProfilename.valueChanges();
    //   this.register.subscribe(res=>{
    //this.role = res.house;
    //this.uemail = res.email;
    //this.uname = res.username;
  //});

  
  
  }
  
gotoSignup() {
    //this.authService.signup(this.email, this.password);
    //this.email = this.password = '';
    this.navCtrl.push(SignupPage);
    
    
    
    
  }
/*
  signup2() {
    this.authService.signup2(this.email, this.password);
	
    this.email = this.password = '';
  }
  */
 login() {
  this.authService.login(this.email, this.password).then(res => {
    this.navCtrl.setRoot(TabsPage);
  }, err => {
    this.errorMessage = err.message;
    console.log(err.message);
  })
  
}

  logout() {
    this.authService.logout();
  }
  
  goToHome(){
    
    this.navCtrl.push(TabsPage);
    //this.navCtrl.setRoot
  }
}
