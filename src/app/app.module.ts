import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PropertyDetailPage } from '../pages/property-detail/property-detail';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../environment';
import { AuthService } from '../pages/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostpropertyPage } from '../pages/postproperty/postproperty';
//import { FileChooser } from '@ionic-native/file-chooser';
//import { File } from '@ionic-native/file';
import { AngularFireStorageModule  } from '@angular/fire/storage';
import { FindPropertyPage } from '../pages/find-property/find-property';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  LoginPage,
  SignupPage,
  PropertyDetailPage,
  PostpropertyPage,
  FindPropertyPage,
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(firebaseConfig),
	AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule, 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  LoginPage,
  SignupPage,
  PropertyDetailPage,
  PostpropertyPage,
  FindPropertyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
	AngularFireDatabase,
  AuthService,
  AngularFirestore,
  //FileChooser,File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
