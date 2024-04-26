import { Component } from '@angular/core';
import { categories } from 'src/models/Categories';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  cats = categories
}
