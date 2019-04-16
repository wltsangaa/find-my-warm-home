import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Chat } from "../../app/app.models";
import { ChatService } from "../../app/app.service";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-chatroom",
  templateUrl: "chatroom.html"
})
export class ChatroomPage implements OnInit {
  chats: any = [];
  chatpartner = this.chatService.currentChatPartner;
  chatuser;
  message: string;
  chatPayload: Chat;
  intervalScroll;
  @ViewChild("content") content: any;
  tmpemail: any;
  other: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private chatService: ChatService,
    private storage: Storage
  ) {}

  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {

    this.other = this.chatService.currentChatPairId.replace(this.chatuser.email, "");
    this.other = this.other.replace("|","");
    console.log("chatroomdidenter other email");
    console.log(this.other);

    this.db.doc<any>('noticeUsers/'+ this.other).valueChanges().subscribe(
      record=>{
        
        if(record != undefined)
        {this.tmpemail = record.emails;
       //this.tmpemail.push({email:this.chatuser.email, new:true});
       console.log("if the array exists");
       console.log(this.tmpemail);
        }
      
        else{
          //this.tmpemail.push({email:this.chatuser.email, new:true});
          console.log("if the notice array not exist");
          console.log(this.tmpemail);
           }
      }
    );
    this.content.scrollToBottom(300); //300ms animation speed
  }

  ngOnInit() {
    this.tmpemail = new Array;
    this.storage.get("chatuser").then(chatuser => {
      this.chatuser = chatuser;
    });

    this.db
      .collection<Chat>("chatroomRecord", res => {
        return res.where("pair", "==", this.chatService.currentChatPairId);
      })
      .valueChanges()
      .subscribe(chats => {
        
        this.chats = chats;
       console.log(this.chats);
      });
      


  } //ngOnInit

  addChat() {
    if (this.message && this.message !== "") {
      console.log(this.message);
      this.chatPayload = {
        message: this.message,
        sender: this.chatuser.email,
        pair: this.chatService.currentChatPairId,
        time: new Date().getTime()
      };

      this.chatService
        .addChat(this.chatPayload)
        .then(() => {
          //Clear message box
          this.message = "";

          //Scroll to bottom
          this.content.scrollToBottom(300);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } //addChat

  addNotice(){
    this.tmpemail.push({email:this.chatuser.email, new:true});
    this.chatService.addNotice(this.tmpemail, this.other).catch(err=>{console.log(err);});
}
  
  isChatPartner(senderEmail) {
    return senderEmail == this.chatpartner.email;
  } //isChatPartner
}