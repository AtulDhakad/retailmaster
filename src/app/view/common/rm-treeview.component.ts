import { RMTreeModel } from '../../models/rmtreemodel';
import {Component, Output, Input, OnChanges} from '@angular/core';
import {NgStyle} from '@angular/common';


@Component({
  selector: 'app-rm-treeview',
  template: `
      <ul class="k-group k-treeview-lines k-treeview">
        <li class="k-item first-item" [class.rm-collapse]="item.state && item.type === 'folder'" (click)="toggleState(i, $event)"
                              *ngFor="let item of items; let i = index">
          <div class="k-top k-bot">
            <span class="k-icon"></span>
            <span class="k-checkbox-wrapper">
              <input type="checkbox" class="k-checkbox">
              <label class="k-checkbox-label"></label>
            </span>
            <span class="k-in">
              <span class="k-sprite {{item.iconClass}}"></span> {{item.title}}
            </span>
          </div>
          <app-rm-treeview *ngIf="item.items" [items]="item.items"></app-rm-treeview>
          <!--<ul class="k-group">
            <li role="treeitem" class="k-item">
              <div class="k-top">
              <span class="k-icon"></span>
              <span class="k-checkbox-wrapper">
                <input type="checkbox" class="k-checkbox">
                <label class="k-checkbox-label"></label>
              </span>
              <span class="k-in">
                <span class="k-sprite folder"></span>Kendo UI Project
              </span>
              </div>
              <ul class="k-group">
                <li class="k-item">
                  <div class="k-top">
                    <span class="k-checkbox-wrapper">
                      <input type="checkbox" class="k-checkbox">
                      <label class="k-checkbox-label"></label>
                    </span>
                    <span class="k-in">
                      <span class="k-sprite html"></span>
                      about.html
                    </span>
                  </div>
                </li>
                <li role="treeitem" class="k-item">
                  <div class="k-mid">
                    <span class="k-checkbox-wrapper">
                      <input type="checkbox" class="k-checkbox">
                      <label class="k-checkbox-label"></label>
                    </span>
                    <span class="k-in">
                      <span class="k-sprite html"></span>
                      index.html
                    </span>
                  </div>
                </li>
                <li role="treeitem" class="k-item">
                  <div class="k-bot">
                    <span class="k-checkbox-wrapper">
                      <input type="checkbox" class="k-checkbox">
                      <label class="k-checkbox-label"></label>
                    </span>
                    <span class="k-in">
                      <span class="k-sprite image"></span>
                      logo.png
                    </span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>-->
        </li>
      </ul>
  `
})
export class RMTreeViewComponent implements OnChanges {
  @Input() items: RMTreeModel[] = [];
  constructor() {}

  toggleState(idx: number, $event: Event): void {
    const ele: any = $event.target || $event.srcElement;
    if (!(ele.className === 'k-checkbox')) {
      this.items[idx].state = !this.items[idx].state;
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.items) {
      this.initIcons();
    }
  }

  initIcons(): void {
    (this.items || []).forEach(item => {
      if (item.type === 'folder') {
        item.iconClass = 'folder';
      } else {
        const ext = this.getFileExtension(item.title);
        if (this.isImage(ext)) {
          item.iconClass = 'image';
        } else if (this.isTextFile(ext)) {
          item.iconClass = 'html';
        } else if (ext === 'pdf') {
          item.iconClass = 'pdf';
        } else {
          item.iconClass = 'html';
        }
      }
    });
  }

  isTextFile(ext: string): boolean {
    const fileExts: string[] = ['html', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'rtf'];
    return (fileExts.indexOf(ext) >= 0);
  }

  isImage(ext: string): boolean {
    const imageExts: string[] = ['jpg', 'png', 'jpeg', 'svg'];
    return (imageExts.indexOf(ext) >= 0);
  }

  getFileExtension(name: string): string {
    const ext: string[] = name.split('.');
    if (ext[ext.length - 1]) {
      return ext[ext.length - 1];
    } else {
      return '';
    }
  }
}
