import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-input-item',
  templateUrl: './taginputitem.component.html',
  styleUrls: ['./taginputitem.component.scss']
})
export class TaginputitemComponent implements OnInit {
 @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<string> = new EventEmitter();

  constructor() {}

  removeTag() {
    this.tagRemoved.emit(this.text);
  }

  ngOnInit() {
  }

}
