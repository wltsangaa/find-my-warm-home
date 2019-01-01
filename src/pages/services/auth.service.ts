import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
//import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs/Observable';
//import { FirebaseAuth } from '@angular/fire';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  //ref = firebase.database().ref('userp/');
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = this.firebaseAuth.authState;
    

  }

  signup(form:FormGroup) {
    if(form.value['house'] =="tenant")
  { return new Promise<any>((resolve, reject) => {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(form.value['emailhkustonly'], form.value['password'])
      .then( res => resolve(res),
      err => reject(err))
   });    
  }
  else {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(form.value['emailother'], form.value['password'])
        .then( res => resolve(res),
        err => reject(err))
     }) ;   
  }
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
    ;
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }
/*
   actionCodeSettings:any = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  }
};
  signup2(email: string, password: string){
  this.firebaseAuth.auth().sendEmailVerification(email, this.actionCodeSettings)
  .then(
    value => {
        console.log('Success!', value);
  })
  .catch(function(error) {
            console.log('Something went wrong:',err.message);
  });
  this.
}
*/
}