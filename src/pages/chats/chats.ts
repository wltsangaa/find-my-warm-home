import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Storage } from "@ionic/storage";
import { User, Chat } from "../../app/app.models";

import { ChatService } from "../../app/app.service";
import { ChatroomPage } from "../chatroom/chatroom";

import { GroupsPage } from "../groups/groups";


@IonicPage()
@Component({
  selector: "page-chats",
  templateUrl: "chats.html"
})
export class ChatsPage  {
  availableusers: any = [];
  chatuser:any;
  chatted: any = [];
  notice: any;
  wanttocontact: any = [];
  want: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private storage: Storage,
    private chatService: ChatService
  ) {}
ionViewDidEnter(){
  this.storage.get("chatuser").then(chatuser => {
    

this.db.doc<any>('noticeUsers/'+ chatuser.email).valueChanges().subscribe(
  record=>{
    
    if(record != undefined)
    {this.notice = record.emails;
   //this.tmpemail.push({email:this.chatuser.email, new:true});
   console.log("in chat, if the notice exists");
   console.log(this.notice);
    }
  
    else{
      //this.tmpemail.push({email:this.chatuser.email, new:true});
      console.log("in chat, if the notice not exist");
      console.log(this.notice);
       }
  }
);
  });
}
  ionViewDidLoad() {
    //Fetch other users

    this.chatService.createcontactme("gg@gmail.com");//hard codddddeeeee

    this.storage.get("chatuser").then(chatuser => {
      this.chatuser = chatuser;


      this.db
        .collection<User>("chatroomUsers")
        .valueChanges()
        .subscribe(users => {
          //this.availableusers = users;
          console.log(users);
          let tmpchatuser = users.filter(user => {
            if (user.email == chatuser.email) {
              return user;
            }
          });
          this.chatuser = tmpchatuser[0];
          console.log("in chatts");
          console.log(this.chatuser);
          this.availableusers = users.filter(user => {
            if (user.email != chatuser.email) {
              return user;
            }
          });
          if(this.chatService.contactme != '')
          { this.want = true;
            this.wanttocontact = users.filter(user => {
            if (user.email == this.chatService.contactme) {
              return user;
            }
          });}
          console.log("want to contact");
          console.log(this.wanttocontact);
        });
        // this.db
        // .collection<Chat>("chatroomRecord")
        // .valueChanges()
        // .subscribe(records => {
        //   //this.availableusers = users;
        //   console.log(records);
        //   let tmprecord = records.filter(record => {
        //     if (record.pair.includes(chatuser.email)) {
              
              
        //       return record;
        //     }
        //   });
        //   this.chatted = tmprecord;
        //   console.log("in chatts");
        //   //console.log(tmprecord);
        //   console.log(this.chatted);

        // });


    });
    this.notice = new Array;
  }
offNotice(index){
if(this.notice != [])
{this.notice[index].new = false;
  this.chatService.addNotice(this.notice, this.chatuser.email).catch(err=>{console.log(err);});
}

}
  goToChat(chatpartner) {
    this.chatService.currentChatPairId = this.chatService.createPairId(
      this.chatuser,
      chatpartner
    );

    this.chatService.currentChatPartner = chatpartner;
    this.navCtrl.push(ChatroomPage);
    // this.db
    //       .collection<User>("chatroomUsers", ref => {
    //         return ref.where("email", "==", this.chatuser.email);
    //       })
    //       .valueChanges()
    //       .subscribe(users => {
    //         console.log(users);
    //         if (users == [] || users.length === 0) {
    //           //Register User

    //   this.chatService.addUser({email:this.chatuser.email, name: this.chatuser.username,  time: new Date().getTime() });
    //   this.navCtrl.push(ChatroomPage);
    // }
    //         else{this.navCtrl.push(ChatroomPage);}});
    
  } //goToChat

  JoinGroupChat()
  {
    
  }

  myGroupChat()
  {
    this.navCtrl.push(GroupsPage);
  }






}