import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropship-agent-profile',
  templateUrl: './dropship-agent-profile.html'
})

export class DropshipAgentProfileComponent {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<any>();

  closeProfile(): void {
    this.onClose.emit(true);
  }
}
