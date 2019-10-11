import {Component} from '@angular/core';

@Component({
  selector: 'app-dropship-customers',
  templateUrl: './dropship-customers.html'
})

export class DropshipCustomersComponent {
  isViewEnabled: boolean = false;
  profile: any = [];
  views: any = {
    profile: false,
    history: false
  };

  openView(key: string): void {
    this.isViewEnabled = true;
    this.views[key] = true;
  }


  closeView(key: string): void {
    this.views[key] = false;
    this.isViewEnabled = false;
  }
}
