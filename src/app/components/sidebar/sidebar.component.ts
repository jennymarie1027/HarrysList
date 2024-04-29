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
  selectAllChecked = false;
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
      form[justCategories[i]] = true
    }
    console.log('form = ', form)
    return form;
  }

  selectAllOrNothing(){
    for(const prop in this.formattedCategories.value) {
      this.formattedCategories.value[prop] = !this.formattedCategories.value[prop]
      console.log(`${prop}: ${this.formattedCategories.value[prop]}`)
    }
    }
  }


