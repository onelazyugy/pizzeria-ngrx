import { Component, OnInit, OnDestroy } from '@angular/core';
import { CorsService } from 'src/app/service/cors.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RegisterActions from './store/register.action';
import { RegisterUserRequest } from 'src/app/model/register-user-request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  userRegistrationForm!: FormGroup;
  registrationSubscription: Subscription;
  isRegistering: boolean = false;
  status: string = '';

  constructor(private store: Store<fromApp.AppState>, private route: Router, private fb: FormBuilder, private corsService: CorsService) { }

  ngOnInit() {
    this.userRegistrationForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      nickName: [null, [Validators.required]]
    });

    this.registrationSubscription = this.store.select('registerReducer').subscribe(response => {  
      if(response.registerStatus.isRegisteringComplete) {
        this.isRegistering = false;
        if(response.registerStatus.isRegisterSuccess) {
          this.status = 'register success';
          setTimeout(() => {
            //redirect to login page after 2 second to indicate register success
            this.route.navigate(['/login']);
          }, 2000);
        } else {
          this.status = 'register fail';
        }
      }
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.userRegistrationForm.controls.confirmPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.userRegistrationForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm(): void {
    for (const i in this.userRegistrationForm.controls) {
      this.userRegistrationForm.controls[i].markAsDirty();
      this.userRegistrationForm.controls[i].updateValueAndValidity();
    }
    const registerUserRequest: RegisterUserRequest = {
      email: this.userRegistrationForm.value.email,
      password: this.userRegistrationForm.value.password,
      confirmPassword: this.userRegistrationForm.value.confirmPassword,
      nickName: this.userRegistrationForm.value.nickName
    };

    this.isRegistering = true;
    this.status = '';
    this.store.dispatch(
      new RegisterActions.StartRegisterUserTask(registerUserRequest)
    );
  }

  login(): void {
    this.route.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if(this.registrationSubscription !== undefined) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
