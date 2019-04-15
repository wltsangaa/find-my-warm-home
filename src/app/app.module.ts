import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/Profile/Profile';
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

import { PhotoViewer } from '@ionic-native/photo-viewer/';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { FirebaseService } from '../pages/services/firebase.service';
import { ChatsPage } from '../pages/chats/chats';
import { ChatroomPage } from '../pages/chatroom/chatroom';
import { ChatService } from './app.service';
import { PipesModule } from '../pipes/pipes.module';
import { IonicStorageModule } from "@ionic/storage";
import { ScrollHideDirective } from '../pages/services/scroll-hide';
import { BookmarkPage } from '../pages/bookmark/bookmark';
import { UserDetailPage } from '../pages/user-detail/user-detail';

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    PropertyDetailPage,
    PostpropertyPage,
    FindPropertyPage,
    ChatsPage,
    ChatroomPage,
    BookmarkPage,
    ScrollHideDirective,
    UserDetailPage,
  ],
  imports: [
    PipesModule,
    IonicStorageModule.forRoot({
      name: "__ionfirechat"
    }),
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
    ProfilePage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    PropertyDetailPage,
    PostpropertyPage,
    FindPropertyPage,
    ChatsPage,
    ChatroomPage,
    BookmarkPage,
    UserDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    ImagePicker,
    Crop,
    ChatService,
    Storage,
    FirebaseService,
    AngularFireDatabase,
    AuthService,
    AngularFirestore,
    //FileChooser,File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
