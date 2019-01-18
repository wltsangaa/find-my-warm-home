import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-property-detail',
  templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {

value:Observable<any[]>;
name:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  
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
