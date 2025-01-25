import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  standalone: false,

})
export class ServicesComponent {


  @Input() imagePath : string = ""

  @Input() value : string = ""

  @Input() description : string = ""

}
