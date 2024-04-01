import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email = '';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.email$.subscribe((email) => this.email = email)
  }
}
