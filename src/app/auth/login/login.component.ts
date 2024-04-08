import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('harry1', [Validators.required]),
    password: new FormControl('harry1'),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onLoginSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/posts');
        console.log('res login component = ', response);
      },
      error: (err) => {
        console.log('error inside login =', err);
        if (!err.status) {
          this.loginForm.setErrors({ noConnection: true });
        } else {
          this.loginForm.setErrors({ loginError: true });
        }
      },
    });
  }
}
