import { FormControl } from "@angular/forms";

export function validateRePassword(control: FormControl){
    const { root } = control;
    const pass = root.get('password'),
          rePass = root.get('confirmpsw');
  
    if(!pass || !rePass) {
      return null;
    }
  
    const passVal = pass.value,
          rePassVal = rePass.value;
  
    const result = passVal===rePassVal ? null : { passDontMatch: true };
    return result;
  }
