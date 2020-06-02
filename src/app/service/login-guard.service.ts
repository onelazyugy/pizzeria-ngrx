import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HelperService } from './pizzeria-helper.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private helperService: HelperService) { }

  canActivate(): boolean {
    // if something exist in localstorage, than we know the user must be logged in already
    // this handle the case where user already logged in but navigate to the /login route manually again
    if(this.helperService.getObjectFromLocalStorage() !== undefined) {
      return false;
    } else if(this.helperService.getObjectFromLocalStorage() === undefined) {
      return true;
    } else {
      return true;
    }
  }
}
