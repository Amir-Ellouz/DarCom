import {Component, Input} from '@angular/core';
import {Product} from "../../core/models/base-models/product/product";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: false,
})
export class ProductsComponent {

  @Input() products! : Product[]

}
