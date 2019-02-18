import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
//import { FileChooser } from '@ionic-native/file-chooser';
//import { File } from '@ionic-native/file';
import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';
//import { ImagePicker } from '@ionic-native/image-picker/ngx';
/**
 * Generated class for the PostpropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface User{email:string;
uid:string;
displayName:string;}

@Component({
  selector: 'page-postproperty',
  templateUrl: 'postproperty.html',
})

export class PostpropertyPage {
  propertyProfileCollection:any;
  validations_form: FormGroup;
  localprofile:User;
  details=["price", "publicLocationNamesEn", "address", "area", "layout", "nooftenant"];
  validation_messages = {

    'price':[
      { type: 'required', message: 'Excepted rent is required.' },
      { type: 'pattern', message: 'The rent should be a number' }
      
    ],
    'publicLocationNamesEn':[
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'The location should be correct.' }
      
    ],
    'address':[
      { type: 'required', message: 'Address is required.' },
      { type: 'pattern', message: 'The address should be correct.' }
      
    ],
    'area':[
      { type: 'required', message: 'Area is required.' },
      { type: 'pattern', message: 'The area should be a number.' }
      
    ],
    'layout':[
      { type: 'required', message: 'Layout is required.' },
      { type: 'pattern', message: 'The details of layout should be correct.' }
      
    ],
    'arnooftenant':[
      { type: 'required', message: 'Number of expected tenants is required.' },
      { type: 'pattern', message: 'It should be a number.' }
      
    ],
  }
  userProfileCollectionemailname: any;
  profileUrl: Observable<any>;
  image: string;
  task: AngularFireUploadTask;
  progress: any;
  pid: string;
  propertyrofileCollectionemailname: any;
  peoplelist:any[];

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authService: AuthService,
    public fireStore: AngularFirestore,
    //private fileChooser: FileChooser,private file:File,
    private storage: AngularFireStorage,
   // private imagePicker: ImagePicker,
    ) {
      this.propertyProfileCollection = this.fireStore.collection<any>('propertyProfile');
      this.pid = this.fireStore.createId();
    }
//using willlll herere
    ionViewWillLoad() {
    console.log('ionViewWillLoad PostpropertyPage');

    this.validations_form = this.formBuilder.group({
      publicLocationNamesEn: new FormControl('', Validators.compose([

        //only accept character with number, delete (?+.* 0-9) if no require the number.
        Validators.pattern('^[a-zA-Z0-9,._ ]+$'),
        Validators.required
      ])),
      
      price:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),

      address:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9,._ ]+$')
      ])),

      area:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),

      layout:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9,._ ]+$')
      ])),
      
      email:new FormControl(),
      uid:new FormControl(),
      agreementId:new FormControl(),

      nooftenant:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),
    });
    this.authService.user.subscribe(user=>{if(user){this.localprofile=user;}});
    
  }

  ionViewDidLoad() {
    console.log(this.localprofile);
    
  }
  onSubmit(values){
    console.log(this.localprofile);
   // this.properityProfileCollection.add(values);
   this.validations_form.controls['email'].setValue(this.localprofile.email);
   this.validations_form.controls['uid'].setValue(this.localprofile.uid);
   this.validations_form.controls['agreementId'].setValue(this.pid);
   console.log(this.validations_form.value);
   this.propertyrofileCollectionemailname = this.fireStore.doc<any>('propertyProfile/'+ this.pid.toString());
   //this.userProfileCollectionemailname = this.fireStore.doc<any>('userProfile/'+ this.localprofile.uid.toString());
    //this.propertyProfileCollection.add(this.validations_form.value);
    this.propertyrofileCollectionemailname.set(this.validations_form.value);
    //this.peoplelist.push({ who: new String("add"), when: + new Date() });
    //update data in firebase
    this.propertyrofileCollectionemailname.update({userName: this.localprofile.displayName});
    this.propertyrofileCollectionemailname.update({dateCreated: new Date().getTime()});
    this.propertyrofileCollectionemailname.update({peoplelist:[{ who: ["email", "name"], when: new Date().getTime() }] });
    this.propertyrofileCollectionemailname.update({comments:[{ who: ["email", "name"], when: new Date().getTime(), message:"message" }] }); 
  }
  

  /*fchoose(){


      this.file.resolveLocalFilesystemUrl(()=>{

        alert(JSON.stringify(newUrl));
        let dirPath=newUrl.nativeURL;
        let dirPathSegments = dirPath.split('/');
        dirPathSegments.pop();
        dirPath = dirPathSegments.join('/');
        this.file.readAsArrayBuffer(dirPath,newUrl.name).then((buffer)=>{
          //this.upload(buffer,newUrl.name);
          console.log(buffer);
          console.log(newUrl);
        })
      }
      )
    
  }
*/
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const task = this.storage.upload(filePath, file);
  }
  choose(picId){
    const ref = this.storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
  }

  createUploadTask(file: string): void {

    const filePath = `my-pet-crocodile_${ new Date().getTime() }.jpg`;

    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.storage.ref(filePath).putString(this.image, 'data_url');

    this.progress = this.task.percentageChanges();
}
}
