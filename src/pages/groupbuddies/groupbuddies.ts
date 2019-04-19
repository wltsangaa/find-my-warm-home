import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../providers/requests/requests';
import { GroupsProvider } from '../providers/groups/groups';
import { AngularFirestore } from '@angular/fire/firestore';

/**
 * Generated class for the GroupbuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groupbuddies',
  templateUrl: 'groupbuddies.html',
})
export class GroupbuddiesPage {
  myfriends = [];
  groupmembers = [];
  searchstring; 
  choseother:boolean=true;
  tempmyfriends = [];
  newbuddy;
  interest: string;
  gender: any;
  tenants: any;
  alertCtrl: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
              public events: Events, public groupservice: GroupsProvider, public alertController: AlertController,public db: AngularFirestore) {
                
  }

  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.events.subscribe('gotintogroup', () => {
      this.myfriends.splice(this.myfriends.indexOf(this.newbuddy.uid), 1);
      this.tempmyfriends = this.myfriends;
    })
    this.events.subscribe('friends', () => {
      
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
      this.groupmembers = this.groupservice.currentgroup;
      for (var key in this.groupmembers)
        for (var friend in this.myfriends) {
          if (this.groupmembers[key].uid === this.myfriends[friend].uid)
            this.myfriends.splice(this.myfriends.indexOf(this.myfriends[friend]), 1);
        }
      this.tempmyfriends = this.myfriends;
    })
  }

  searchuser(searchbar) {
    let tempfriends = this.tempmyfriends;

    var q = searchbar.target.value;

    if (q.trim() === '') {
      this.myfriends = this.tempmyfriends;
      return;
    }

    tempfriends = tempfriends.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
    
    this.myfriends = tempfriends;

  }


  async presentAlert() {
   
  }

  async addbuddy(buddy) {
    
    const alert = await this.alertController.create({
     
      message: buddy.username +" has been added.",
      buttons: ['OK']
    });

    await alert.present();
    this.newbuddy = buddy;
    this.groupservice.addmember(buddy);

    
  }


  showad(){
    this.choseother = !this.choseother;
  }

  findProperty(ev, tablename, fieldname, order) {
    // set val to the value of the ev target
    var val:string = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.filtereditems=this.items.filter((item) => {
      //   return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      // }); 
   
     if(tablename == "userProfile"){
      this.tenants = this.db.collection(tablename, ref => ref.orderBy(fieldname).orderBy(order).startAt(val).endAt(val + "\uf8ff")).valueChanges();
    }
   
  }
}

  findMate(){

    console.log("aaaaaa");
    if (this.interest != '' && this.gender.trim() && this.gender != '' ) {
      // this.filtereditems=this.items.filter((item) => {
      //   return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      // }); 
      this.tenants = this.db.collection('userProfile', ref => ref.limit(50).where("interest","==",this.interest)
      .where("gender","==",this.gender).where("uid","==",this.interest).orderBy("price")).valueChanges();
      
    } 

  }



}