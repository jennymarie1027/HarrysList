import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  signedin = false;
  email = '';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.signedin$.subscribe(
      (signedin) => (this.signedin = signedin)
    );
    this.authService.email$.subscribe((email) => (this.email = email));
    this.signedin = this.authService.isLoggedIn();
    console.log('email = ', this.email);
  }
}
