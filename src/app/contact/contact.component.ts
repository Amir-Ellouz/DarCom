import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false,
})
export class ContactComponent {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      email: new FormControl(),
      name: new FormControl(),
      message: new FormControl(),
    });
  }
  onSubmit() {
    console.log('submitted');
    this.form.reset();
  }
}
