import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() data: string[] = [];
  @Input() all: boolean = true;
  //  To Select a spicific option on rendering
  @Input() selected: string = '';

  @Output() selectedValue = new EventEmitter();
  detectChanges(event: any) {
    this.selectedValue.emit(event);
  }
}
