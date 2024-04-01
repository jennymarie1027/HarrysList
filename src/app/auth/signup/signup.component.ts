import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    passwordConfirmation: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router){}

  createUser() {
    this.authService.signup(this.loginForm.value).subscribe()
    this.router.navigateByUrl('/posts')
  }
}
