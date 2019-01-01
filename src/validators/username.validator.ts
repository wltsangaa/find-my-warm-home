import { FormControl } from '@angular/forms';
export class UsernameValidator {
  static validUsername(fc: FormControl){
    if(fc.value.toLowerCase() === "ust" || fc.value.toLowerCase() === "students"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }
}