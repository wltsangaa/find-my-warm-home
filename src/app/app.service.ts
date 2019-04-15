import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { User, Chat } from "./app.models";

@Injectable()
export class ChatService {
  users: AngularFirestoreCollection<User>;

  chats: AngularFirestoreCollection<Chat>;

  //The pair string for the two users currently chatting
  currentChatPairId;
  currentChatPartner;
  userNotice: any;
  tmpemail:any;
  //userProfileCollectionemailname: any;
  contactme:string = '';
  //used to contact a particiliar person
  
  constructor(private db: AngularFirestore) {
    
    this.users = db.collection<User>("chatroomUsers");
    this.chats = db.collection<Chat>("chatroomRecord");
    
  }
  createcontactme(email:string){
    if(email!='' && email != null)
    this.contactme = email;

  }

  addUser(payload) {

    // this.userProfileCollectionemailname = this.db.doc<any>('chatroomUsers/'+ payload.email.toString());
    //     //saving to the database
    //     this.userProfileCollectionemailname.set(payload);
    
      return this.users.add(payload);
  } //addUser
  addNotice(notices, user2) {

     this.userNotice = this.db.doc<any>('noticeUsers/'+ user2.toString());
    //     //saving to the database
        

        if(notices != [])
       return  this.userNotice.set({emails:notices});
        
        
       
    
      
  } //addNoticeto user
  addChat(chat: Chat) {
    return this.chats.add(chat);
  } //addChat

  createPairId(user1, user2) {
    let pairId;
    if (user1.time < user2.time) {
      pairId = `${user1.email}|${user2.email}`;
    } else {
      pairId = `${user2.email}|${user1.email}`;
    }

    return pairId;
  } //createPairString

}
