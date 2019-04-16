import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';
import { ChatService } from "../../app/app.service";
import { ChatsPage } from "../chats/chats";
import { Storage } from "@ionic/storage";
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';
export interface User{
  username: any;email:string;
  house:string;
  }

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  uid: string;
  verified: boolean;
  userProfilename: any;
  register: any;
  role: any;
  uemail: any;
  uname: any;
  firegroup: any;
  loginForm: any = {};
  logged: boolean;

  constructor(public navCtrl: NavController,
    public db: AngularFirestore,
    public authService: AuthService,
    public fireStore: AngularFirestore,
    private chatservice: ChatService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage) {
      this.logged = false;
      
  }

  ionViewDidLoad(){
    this.firegroup=firebase.database().ref('/groups');
    this.authService.user.subscribe(user=>{if(user)
      {this.uid=user.uid;
       this.verified =user.emailVerified;  

    this.userProfilename = this.fireStore.doc<User>('userProfile/'+ this.uid);
    this.register = this.userProfilename.valueChanges();
       this.register.subscribe(res=>{
    this.role = res.house;
    this.uemail = res.email;
    this.uname = res.username;
    });
    this.logged =true;

    this.storage.get("chatuser").then(chatuser => {
      if (chatuser && chatuser.email !== "" && chatuser.email == this.uemail) {
        if(this.navCtrl!=null && ChatsPage != null)
        this.navCtrl.setRoot(ChatsPage);
      }else{this.loginUser();}
    });
  }
    else{console.log("not logined");}});
  }

  ngOnInit() {
    
  }

  loginUser() {
    if (this.uemail != "") {
      //Check if email already exists
      let myLoader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      myLoader.present().then(() => {
        this.db
          .collection<User>("chatroomUsers", ref => {
            return ref.where("email", "==", this.uemail);
          })
          .valueChanges()
          .subscribe(users => {
            console.log("contactts' user");
            console.log(users);
            if (users.length === 0) 
              //Register User
              {
                //Register User
  
        this.chatservice.addUser({email:this.uemail, name: this.uname,  time: new Date().getTime() });
        this.navCtrl.push(ChatsPage);
      }
              
              //Add the timestamp
              // this.loginForm.time = new Date().getTime();

              // this.chatservice
              //   .addUser(this.loginForm)
              //   .then(res => {
              //     //Registration successful
                  
              //     this.storage.set("chatuser", this.loginForm);
              //     myLoader.dismiss();

              //     let toast = this.toastCtrl.create({
              //       message: "Login In Successful",
              //       duration: 3000,
              //       position: "top"
              //     });
              //     toast.present();

              //     this.navCtrl.push(ChatsPage);
              //   })
              //   .catch(err => {
              //     console.log(err);
              //     myLoader.dismiss();
              //   });
             else {
              //User already exists, move to chats page
              
              this.storage.set("chatuser", users[0]);

              let toast = this.toastCtrl.create({
                message: "Welcome to Our Chatroom",
                duration: 3000,
                position: "top"
              });
              toast.present();
              myLoader.dismiss();
              
              this.navCtrl.setRoot(ChatsPage);
            }
          });
      });
    } else {
      let toast = this.toastCtrl.create({
        message: "Enter Email to log in",
        duration: 3000,
        position: "top"
      });
      toast.present();
      this.navCtrl.popToRoot();
    }
  }

}
