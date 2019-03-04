import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
//import { FileChooser } from '@ionic-native/file-chooser';
//import { File } from '@ionic-native/file';
import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';
import { ActionSheetController} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { normalizeURL} from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the PostpropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/**
 * 28hse: contact person (with phone no.)
 *  */

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
  //details=["price", "publicLocationNamesEn", "address", "area", "layout", "nooftenant"];
  details = [
    {key:"price", label:"Price"},
    {key:"publicLocationNamesEn", label:"Location"},
    {key:"address", label:"Address"},
    {key:"area", label:"Area"},
    {key:"layout", label:"Layout"},
    {key:"nooftenant", label:"No. of Tenant"},
  ];
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

  //image picker
  photos : Array<any>;
  photoLink: Array<any>;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authService: AuthService,
    public fireStore: AngularFirestore,
    //private fileChooser: FileChooser,private file:File,
    private storage: AngularFireStorage,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseService,
    public cropService: Crop,
    ) {
      this.propertyProfileCollection = this.fireStore.collection<any>('propertyProfile');
      this.pid = this.fireStore.createId();
      // image picker
      this.photos = new Array<any>();
      this.photoLink = new Array<any>();
    }
//using willlll herere
    ionViewWillLoad() {
    console.log('ionViewWillLoad PostpropertyPage');

    this.validations_form = this.formBuilder.group({
      publicLocationNamesEn: new FormControl('', Validators.compose([

        //only accept character with number, delete (?+.* 0-9) if no require the number.
        //Validators.pattern('^[a-zA-Z0-9,._ ]+$'),
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
    console.log("onSubmit!!!");
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
    
    // image-upload submit
    console.log("Total Photos: " + this.photos.length);
    //this.uploadImageToFirebase2(this.photos[0]);
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

// image picker
// openImagePickerCrop(){
//   this.imagePicker.hasReadPermission().then(
//     (result) => {
//       if(result == false){
//         // no callbacks required as this opens a popup which returns async
//         this.imagePicker.requestReadPermission();
//       }
//       else if(result == true){
//         this.imagePicker.getPictures({
//           maximumImagesCount: 1
//         }).then(
//           (results) => {
//             for (var i = 0; i < results.length; i++) {
//               this.cropService.crop(results[i], {quality: 75}).then(
//                 newImage => {
//                   this.uploadImageToFirebase(newImage);
//                 },
//                 error => console.error("Error cropping image", error)
//               );
//             }
//           }, (err) => console.log(err)
//         );
//       }
//     }, (err) => {
//       console.log(err);
//     });
// }

openImagePicker(){
  this.imagePicker.hasReadPermission().then(
    (result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              //this.uploadImageToFirebase(results[i]);
              console.log("Before convertFileSrc: " + results[i].toString());
              let win: any = window; // hack compilator
              let safeURL = win.Ionic.WebView.convertFileSrc(results[i].toString());
              //this.photos.push(normalizeURL(results[i]));
              this.photos.push(safeURL);
              console.log("After convertFileSrc: " + safeURL);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
}

// uploadImageToFirebase(image){
//   image = normalizeURL(image);

//   //uploads img to firebase storage
//   this.firebaseService.uploadImage(image)
//   .then(photoURL => {
//     console.error("photoURL:" + photoURL);
//     let toast = this.toastCtrl.create({
//       message: 'Image was updated successfully: ' + photoURL,
//       duration: 3000
//     });
//     toast.present();
//     })
// }

// uploadImageToFirebase2(image){
//   console.log("uploadImageToFirebase2(image): ");
//   //image = normalizeURL(image);

//   //uploads img to firebase storage
//   this.firebaseService.uploadImage(image)
//   .then(photoURL => {
//     console.error("photoURL:" + photoURL);
//     let toast = this.toastCtrl.create({
//       message: 'Image was updated successfully: ' + photoURL,
//       duration: 3000
//     });
//     // upload link to db
//     this.propertyrofileCollectionemailname.update({photos:photoURL});
//     toast.present();
//     })
// }

async uploadImageToFirebase3(images){
  console.log("uploadImageToFirebase3");
  //image = normalizeURL(image);

  //uploads img to firebase storage
  for(let i = 0; i < images.length; i++){
  await this.firebaseService.uploadImage(images[i])
  .then(photoURL => {
    console.error("photoURL:" + photoURL);
    let toast = this.toastCtrl.create({
      message: 'Image was updated successfully: ' + photoURL,
      duration: 3000
    });
    this.photoLink.push(photoURL);
    console.log("Photo" + i + ": " + photoURL);
    toast.present();
    })
  }

  // upload link to db
  console.log("photoLink: " + this.photoLink);
  this.propertyrofileCollectionemailname.update({photos:this.photoLink});
  this.photoLink = null;
  this.navCtrl.pop();
}

async presentActionSheet() {
  const actionSheet = await this.actionSheetCtrl.create({
    buttons: [{
      text: 'Camera',
      handler: () => {
        console.log('Camera clicked');
      }
    }, {
      text: 'Photo Library',
      handler: () => {
        console.log('Photo Library clicked');
        this.openImagePicker();
      }
    }, {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}

}
