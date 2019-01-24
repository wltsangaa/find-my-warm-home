import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../../validators/username.validator';
import { TabsPage } from '../tabs/tabs';
import { AngularFirestore } from '@angular/fire/firestore';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  validations_form: FormGroup;
  errorMessage: any;
 // userProfileCollection: any;
  //userProfileCollectionemailname: any;
  id: string;
  

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authService: AuthService,
    ) {

      //this.userProfileCollection = this.fireStore.collection<any>('userProfile');

     
    
  }

 
  
  //idea from https://www.webdeveloper.com/forum/d/236034-require-one-of-two-fields-to-be-filled-eitheror/5
  notnullemail():boolean{
    if(this.validations_form.value['emilhkustonly'] && this.validations_form.value['emailother'] == '')
    {return false;}
    
    else
    {
      return true;
    }  
}

  emailtype():boolean{
    
    if (this.validations_form.value['house']== "tenant")
    { 
      //remove the wrong email if clam as a tenant
      this.validations_form.controls['emailother'].setValue(null);
      
      //console.log('hkust student');
      return true;
    }
    else {
      
      this.validations_form.controls['emailhkustonly'].setValue(null);
      //console.log('not hkust student');
      return false;}
  }

  //when the page successfully build
  ionViewWillLoad() {

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        //check if there are existing username(connecting firbase)
        //if other needs custom validrule, mock this
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        //only accept character with number, delete (?+.* 0-9) if no require the number.
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      
      password:new FormControl('', 
      Validators.minLength(6)),
      
      emailhkustonly: new FormControl('',
        Validators.pattern('^[a-zA-Z0-9_.+-]+@connect\.ust\.hk$')
      ),
      
      emailother: new FormControl('', 
        //Validators.required,

        //!!!!should remove % or not
        Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ),

      price:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),

      interest:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9,.]+$')
      ])),

     gender:new FormControl('', 
      Validators.required
    ),

    house:new FormControl('', 
    Validators.required
    ),
      //matching_passwords: this.matching_passwords_group,
      email:new FormControl(),
      //can be added for privacy later
      terms: new FormControl(true, Validators.pattern('true'))
    });
    
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.(with at least 1 number)' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],

    'emailhkustonly': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Your email must be hkust email (for tenant)' }
      
    ],

    'price':[
      { type: 'required', message: 'Excepted rent is required.' },
      { type: 'pattern', message: 'The rent should be a number' }
      
    ],

    'interest':[
      { type: 'required', message: 'Interest is required.' },
      { type: 'pattern', message: 'Only characters and numbers are accepted.' }
      
    ],

    'gender':[
      { type: 'required', message: 'Gender is required.' }
    ]



  



  }

  onSubmit(){
    if(this.notnullemail()==true){
      
    console.log('!!before send to authorization!!!');
    
    console.log(this.validations_form.value);
    //this.firebase.database().ref('songs')
    //.push({ songName, artistName, userAge });

    //setting a universal email field
    if(this.validations_form.value['house'] =="tenant")
    {this.validations_form.controls['email'].setValue(this.validations_form.value['emailhkustonly']);}
    else{
      this.validations_form.controls['email'].setValue(this.validations_form.value['emailother']);
    }
    //using email as idd
    //this.userProfileCollectionemailname = this.fireStore.doc<any>('userProfile/'+ this.validations_form.value['email'].toString());
    
    console.log("aftermodifyyy");
    
    console.log(this.validations_form.value);
    
    //save the email and password
    this.authService.signup(this.validations_form).then((res) => {
     /*
      console.log('!!remove passwd before save to db!!!');
      delete this.validations_form.value['password'];
      //this.authService.sendEmailVerification();
      //get user uid of auth
      console.log("signup.ts");
      console.log(res.user.uid);
      /*
      this.userProfileCollectionemailname = this.fireStore.doc<any>('userProfile/'+ res.toString());

      //generate id version
      //this.userProfileCollection.add(this.validations_form.value);
      this.userProfileCollectionemailname.set(this.validations_form.value);
      */
      console.log("signup.ts");
      this.navCtrl.setRoot(TabsPage);

    }, err => {
      this.errorMessage = err.message;
      console.log(err.message);
    })

    //To-do: save other information to the db
	
    
    }
  
  }
}
