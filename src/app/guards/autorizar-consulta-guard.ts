import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user-service';
import { inject } from '@angular/core';

export const autorizarConsultaGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  let authorities=userService.getAuthorities();
  if(authorities){
    if(authorities.indexOf("ASSIST")>=0 || authorities.indexOf("ADMIN")>=0 || authorities.indexOf("USER")>=0) {
      return true;
    }
  }  
  return false;
};
