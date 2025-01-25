import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-items-number',
  templateUrl: './items-number.component.html',
  styleUrls: ['./items-number.component.css'],
  standalone: false,
})
export class ItemsNumberComponent {

  itemsNumber : number =1

  @Output() updateItem : EventEmitter<number>= new EventEmitter<number>()

  increment(){
    this.itemsNumber++;
    this.updateItem.emit(this.itemsNumber)
  }

  decrement(){
    if(this.itemsNumber==1){
      return;
    }
    this.itemsNumber--
    this.updateItem.emit(this.itemsNumber)
  }


}
