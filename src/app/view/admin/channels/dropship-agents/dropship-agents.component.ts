import {Component} from '@angular/core';

@Component({
  selector: 'app-dropship-agents',
  templateUrl: './dropship-agents.html'
})

export class DropshipAgentsComponent {
  isProfileView: boolean = false;
  profile: any = [];

  openProfile(): void {
    this.isProfileView = true;
  }

  closeProfile(): void {
    this.isProfileView = false;
  }
}
