import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
//import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs/Observable';
//import { FirebaseAuth } from '@angular/fire';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()

export class AuthService {
  user: Observable<firebase.User>;
  
  
  userProfileCollectionemailname: any;
  profile:any;
  //ref = firebase.database().ref('userp/');
  constructor(private firebaseAuth: AngularFireAuth, public fireStore: AngularFirestore) {
    this.user = this.firebaseAuth.authState;
    //this.user = this.firebaseAuth.authState.subscribe.
    

  }
  sendEmailVerification() {
    
    this.firebaseAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
          
        })
      
      });
  }
  updateprofile(name:string) {
    this.profile = { displayName: name, photoURL: null };
    this.firebaseAuth.authState.subscribe(user => {
      user.updateProfile(this.profile)
        .then((res) => {
          console.log('profile sent');
          
        })
      
      });
  }

  signup(form:FormGroup) {
    
   return new Promise<any>((resolve, reject) => {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(form.value['email'], form.value['password'])
      .then( res => {
        //!!remove passwd before save to db!!!
        delete form.value['password'];
        //send email confirm
        this.sendEmailVerification();
        this.updateprofile(form.value['username']);
        //console.log("In auth.serv");
        console.log(res.user.uid);
        //using the id of authenication as name of database
        this.userProfileCollectionemailname = this.fireStore.doc<any>('userProfile/'+ res.user.uid.toString());
        //saving to the database
        this.userProfileCollectionemailname.set(form.value);
        if(form.value['email'].includes("@connect.ust.hk") == true)
        this.userProfileCollectionemailname.update({isHKUST:true});
        else{this.userProfileCollectionemailname.update({isHKUST:false});}
        //go back to where it was called(signup.ts)
        resolve(res);
      },
      err => reject(err))
   });    
  

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

      window.location.reload();
  }

  update(email: string, password: string) {
    this.firebaseAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
        userCredential.user.updateEmail('newyou@domain.com')
    })
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