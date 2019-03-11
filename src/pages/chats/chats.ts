import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Storage } from "@ionic/storage";
import { User } from "../../app/app.models";

import { ChatService } from "../../app/app.service";
import { ChatroomPage } from "../chatroom/chatroom";


@IonicPage()
@Component({
  selector: "page-chats",
  templateUrl: "chats.html"
})
export class ChatsPage  {
  availableusers: any = [];
  chatuser;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private storage: Storage,
    private chatService: ChatService
  ) {}

  ionViewDidLoad() {
    //Fetch other users

    this.storage.get("chatuser").then(chatuser => {
      this.chatuser = chatuser;

      this.db
        .collection<User>("chatroomUsers")
        .valueChanges()
        .subscribe(users => {
          //this.availableusers = users;
          console.log(users);
          this.availableusers = users.filter(user => {
            if (user.email != chatuser.email) {
              return user;
            }
          });
        });
    });
  }

  goToChat(chatpartner) {
    this.chatService.currentChatPairId = this.chatService.createPairId(
      this.chatuser,
      chatpartner
    );

    this.chatService.currentChatPartner = chatpartner;

    this.navCtrl.push(ChatroomPage);
  } //goToChat
}