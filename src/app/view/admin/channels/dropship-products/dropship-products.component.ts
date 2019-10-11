import { Component } from '@angular/core';

@Component({
  selector: 'app-dropship-products',
  templateUrl: './dropship-products.html'
})

export class DropshipProductsComponent {
  items: any = [];
  constructor() {
    this.items = [{
      title: 'My Documents',
      type: 'folder',
      items: [{
        title: 'Sub Folder',
        type: 'folder',
        items: [{
          title: 'index.html',
          type: 'file'
        } , {
          title: 'logo.png',
          type: 'file'
        } , {
          title: 'icon.jpg',
          type: 'file'
        }]
      } , {
        title: 'Sub Folder Two',
        type: 'folder',
        items: [{
          title: 'index.html',
          type: 'file'
        } , {
          title: 'logo.png',
          type: 'file'
        } , {
          title: 'icon.jpg',
          type: 'file'
        }]
      }]
    }]
  }
}
