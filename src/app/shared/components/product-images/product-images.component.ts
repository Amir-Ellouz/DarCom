import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css'],
  standalone: false,

})
export class ProductImagesComponent {


  @Input() images : string[] = []


  onPrevious() {

  }

  onNext() {

  }
}
