import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-ownproperty-detail',
  templateUrl: 'ownproperty-detail.html'
})
export class OwnPropertyDetailPage {

value:Observable<any[]>;
name:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
    public fireStore: AngularFirestore,) {
	  
	  this.value = this.navParams.get('item');
	  //showing we can get the values inside the observable
	  //this.name = this.value.displaytext;
  }
  
  ionViewDidLoad() {
    

  }
  
  fromlandlord(){
	 return false;
	  
  }
}
