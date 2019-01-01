import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

//import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

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



  constructor(
    //public db: AngularFireDatabase,
    public navCtrl: NavController,
  public authService: AuthService
 // ,public formBuilder: FormBuilder
  ) {
    //this.items = db.list('chatrooms').valueChanges();
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
  
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
    //this.navCtrl.setRoot
  }
}
