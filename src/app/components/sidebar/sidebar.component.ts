import { Component } from '@angular/core';
import { categories } from 'src/models/Categories';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  categories = categories
  formattedCategories: any
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    let form = this.formatForm()
    this.formattedCategories = this.formBuilder.group(form)
  }

  formatForm(){
    let justCategories = this.categories.map((cat) => {
      return cat.value
    })
    let form = {}
    for(let i = 0; i < justCategories.length; i++) {
      form[justCategories[i]] = false
    }
    console.log('form = ', form)
    return form;
  }

  // this.categories = this.formBuilder.group(this.cats)

}
