import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { getSegmentsFromNavGroups } from 'ionic-angular/umd/navigation/url-serializer';
import { ImagePicker } from '@ionic-native/image-picker';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from '../services/firebase.service';
import { Crop } from '@ionic-native/crop';



@Component({
  selector: 'page-profile',
  templateUrl: 'Profile.html'
})
export class ProfilePage {
  uid: string;
  userProfilename: AngularFirestoreDocument<any>;
  register: Observable<any>;
  role: any;
  uemail: any;
  uname: any;
  newname:any;
  photos: any;
  ugender: any;
  uprice: any;
  uinterest: any;
  uDescription: any;

  propertyProfileCollection:any;
  UserProfileCollection:any;
  validations_form: FormGroup;
  localprofile:User;
  //details=["price", "publicLocationNamesEn", "address", "area", "layout", "nooftenant"];
  details = [
    {key:"username", label:"Name", prefill:""},
    {key:"EmailAddress", label:"Email", prefill:""},
    {key:"price", label:"Expected price of renting", prefill:""},
    {key:"interest", label:"interest", prefill:""},
    {key:"gender", label:"gender", prefill:"gender"},
    {key:"Description", label:"Description", prefill:""},
  ];
  validation_messages = { 
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.(with at least 1 number)' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],

    'EmailAddress': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Your email must be a real email' }
      
    ],

    'price':[
      { type: 'required', message: 'Excepted rent is required.' },
      { type: 'pattern', message: 'The rent should be a number' }
      
    ],

    'interest':[
      { type: 'required', message: 'Interest is required.' },
      //{ type: 'pattern', message: 'Only characters and numbers are accepted.' }
      
    ],

    'gender':[
      { type: 'required', message: 'Gender is required.' }
    ],

    'Description':[
      { }
    ]
  } 
  pid: string;
  photoLink: any[];
  propertyrofileCollectionemailname: any;
  name   :  string;
  getuserprofiles: Observable<{}[]>;
  verified: boolean;
  
  
  
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

      //prefill setting  
      this.authService.user.subscribe(user=>{if(user)
        {this.uid=user.uid;
          this.verified =user.emailVerified;  
    
       this.userProfilename = this.fireStore.doc<User>('userProfile/'+ this.uid);
       this.register = this.userProfilename.valueChanges();
    
       this.register.subscribe(res=>{
        this.role = res.house;  
        this.uemail = res.email; 
        this.uname = res.username;
        this.ugender = res.gender;
        this.uprice = res.price;
        this.uinterest=res.interest;
       this.uDescription=res.Description;
       

         //prefill
        this.details[0].prefill=this.uname;
        this.details[1].prefill=this.uemail;
        this.details[2].prefill=this.uprice;
        this.details[3].prefill=this.uinterest;
        this.details[4].prefill=this.ugender;
        this.details[5].prefill=this.uDescription;

  
    
        
      })
    
       ;}})
       
 

    }

    ionViewWillLoad() {
    this.validations_form = this.formBuilder.group({
      
      
      username: new FormControl('', Validators.compose([
        //only accept character with number, delete (?+.* 0-9) if no require the number.
        //Validators.pattern('^[a-zA-Z0-9,._ ]+$'),
        Validators.required
      ])),
      
      price:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),

      interest:new FormControl('', Validators.compose([
        Validators.required
        
      ])),
    
      EmailAddress:new FormControl(),
      uid:new FormControl(),
      agreementId:new FormControl(),

      gender:new FormControl('', Validators.compose([
        Validators.required
      ])),


      Description:new FormControl('', Validators.compose([
        Validators.required
      ]))



    });
    
    

}

ionViewDidLoad() {
  
   
  
  }

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


updateNewInfo(values){
  
  this.userProfilename.update({username: this.details[0].prefill});
  this.userProfilename.update({EmailAddress:this.details[1].prefill});
  this.userProfilename.update({price: this.details[2].prefill});
  this.userProfilename.update({interest: this.details[3].prefill});
  this.userProfilename.update({gender:this.details[4].prefill});
  this.userProfilename.update({Description:this.details[5].prefill});

}
}
 