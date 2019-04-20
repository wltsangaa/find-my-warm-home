import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
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
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../environment';
import { AuthService } from '../pages/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostpropertyPage } from '../pages/postproperty/postproperty';

import { File } from '@ionic-native/file';
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
import { GroupsPage } from '../pages/groups/groups';


import { HttpClientModule } from '@angular/common/http';
import { ImghandlerProvider } from '../pages/providers/imghandler/imghandler';
import { GroupsProvider } from '../pages/providers/groups/groups';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';

import { UserProvider } from '../pages/providers/user/user';
import { RequestsProvider } from '../pages/providers/requests/requests';

import { NewgroupPage } from '../pages/newgroup/newgroup';
import { ChatProvider } from '../pages/providers/chat/chat';


 



import { UserDetailPage } from '../pages/user-detail/user-detail';
import { GroupinfoPage } from '../pages/groupinfo/groupinfo';
import { GroupmembersPage } from '../pages/groupmembers/groupmembers';
import { GroupbuddiesPage } from '../pages/groupbuddies/groupbuddies';
import { GroupchatPage } from '../pages/groupchat/groupchat';

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
    GroupsPage,
    GroupinfoPage,
    GroupmembersPage,
    GroupbuddiesPage,
    GroupchatPage,
    NewgroupPage,
    
   
   
    
    
 
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
    HttpClientModule,
    
  
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
    GroupsPage,
    GroupinfoPage,
    GroupmembersPage,
    GroupbuddiesPage,
    GroupchatPage,
    NewgroupPage,
 
    
   


    
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

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GroupsProvider,
    ImghandlerProvider,
    StatusBar,
    SplashScreen,
    
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    AngularFireAuth,
    
    ImghandlerProvider,
    
    GroupsProvider,
    RequestsProvider,
    UserProvider,
    ChatProvider
    
  ]
})
export class AppModule {}

