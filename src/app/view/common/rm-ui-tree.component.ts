import { ActionOutput, DragOutput } from '../../models/actionoutput';
import { RMUITreeAction } from '../../models/rmuitreeaction';
import { RMUITreeNode } from '../../models/rmuitreenode';
import { Component, Output, Input, OnChanges, EventEmitter, ElementRef, Renderer, OnDestroy, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-rm-ui-tree',
    template: `
    <div cdkDropList class="example-list" (cdkDropListDropped)="drop($event)">
    <div *ngFor="let node of nodes ; let i = index;" cdkDrag>
      <div class="tree-menu-icon-container" *ngIf="level == 1">
        <img [src]="node.icon_path" *ngIf="node.icon_path" />
        <span class="no-icon-holder" *ngIf="!node.icon_path"><i class="fa fa-camera"></i></span>
      </div>
      <div ui-tree-handle="" class="tree-node tree-node-content angular-ui-tree-handle">
        <a class="btn btn-success btn-xs toggle-btn" (click)="toggle(i)" *ngIf="level !== 3 && (node.nodes || []).length">
          <span class="glyphicon glyphicon-chevron-right"
             [class.glyphicon-chevron-right]="!node.collapse" [class.glyphicon-chevron-down]="node.collapse"></span>
        </a> 
        {{node.title}}
        <a class="pull-right btn btn-xs" [ngClass]="{'btn-success': node.is_active == 1, 'btn-danger': node.is_active == 0 }" (click)="onAction(node, i, 'status')" 
        style="margin-right: 8px; margin-left: 5px;">
            <span class="glyphicon" 
            [ngClass]="{'glyphicon-eye-open': node.is_active == 1, 'glyphicon-eye-close': node.is_active == 0 }">
            </span>
        </a>
        <a class="pull-right btn btn-danger btn-xs"
            *ngIf="level === 3" (click)="onAction(node, i, 'remove')"><span class="glyphicon glyphicon-remove"></span></a>
        <a class="pull-right btn btn-danger btn-xs"
            (click)="onAction(node, i, 'edit')" style="margin-left: 5px;"><span class="glyphicon glyphicon-pencil"></span></a>
        <a class="pull-right btn btn-primary btn-xs"
            *ngIf="level !== 3" (click)="onAction(node, i, 'add')" style="margin-right: 8px;">
                  <span class="glyphicon glyphicon-plus"></span></a>
      </div>
      <ol class="child-nodes" [class.collapsed]="!node.collapse" *ngIf="(node.nodes || []).length && level <= maxNodeLevel">
          <li>
            <app-rm-ui-tree [nodes]="node.nodes" (dragEvent)="dragEvent.emit($event)"
                (EditClick)="EditClick.emit($event)" (StatusChangeClick)="StatusChangeClick.emit($event)"
                (RemoveClick)="RemoveClick.emit($event)" (AddClick)="AddClick.emit($event)" [level]="level+1"></app-rm-ui-tree>
          </li>
      </ol>
    </div>
    </div>
  `,
    styles: [`
    .cdk-drag-preview {
        border: 1px solid #dae2ea;
        background: #f8faff;
        color: #7c9eb2;
        font-weight: bold;
        padding: 10px 10px;
        max-height: 44px;
        margin-left: 46px !important;
    }

    .tree-node-content .cdk-drag-preview {
        margin-left: 46px !important;
    }

    .cdk-drag-preview .child-nodes {
        display: none;
    }

    .tree-node-content {
        margin-left: 46px !important;
        min-height: 45px;
        height: auto;
    }

    .cdk-drag-preview  .tree-menu-icon-container {
        width: 42px;
        float: left;
        line-height: 43px;
    }

    .cdk-drag-preview .btn {
        margin-right: 8px;
        margin-bottom: 0px;
    }

    .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
   
    .cdk-drag-placeholder {
      opacity: 0;
    }
    .cdk-drag-placeholder .example-list {
        display: none;
    }
    .cdk-drop-list-dragging{
    }
    `]
})
export class RMUITreeComponent implements OnDestroy, OnChanges {
    @Input() nodes: RMUITreeNode[] = [];
    @Input() maxNodeLevel: number = 3;
    @Input() level: number = 1;
    @Output() AddClick: EventEmitter<ActionOutput> = new EventEmitter<ActionOutput>();
    @Output() StatusChangeClick: EventEmitter<ActionOutput> = new EventEmitter<ActionOutput>();
    @Output() EditClick: EventEmitter<ActionOutput> = new EventEmitter<ActionOutput>();
    @Output() RemoveClick: EventEmitter<ActionOutput> = new EventEmitter<ActionOutput>();
    @Output() dragEvent: EventEmitter<any> = new EventEmitter<any>();
    collapse: boolean = true;

    constructor() { }

    ngOnChanges(changes: any): void { }

    toggle(idx): void {
        this.nodes[idx].collapse = !this.nodes[idx].collapse;
    }

    drop(event: CdkDragDrop<string[]>) {    
        moveItemInArray(this.nodes, event.previousIndex, event.currentIndex);
        let data = new FormData();
        data.append('menu_id', String(this.nodes[event.currentIndex].menu_id));
        data.append('current_position', String(event.currentIndex));
        const data1 = {
            menu_id: String(this.nodes[event.currentIndex].menu_id),
            current_position: String(event.currentIndex)
        };
        // console.log('data1', String(this.nodes[event.currentIndex].menu_id), event.currentIndex);
        this.dragEvent.emit(data);
    }

    onAction(node: RMUITreeNode, idx: number, type: string): void {
        const data = {
            level: type === 'add' ? this.level + 1 : this.level,
            item: node,
            index: idx,
            action: type === 'add' ? RMUITreeAction.ADD : type === 'remove' ?
                RMUITreeAction.REMOVE : type === 'edit' ? RMUITreeAction.EDIT : RMUITreeAction.STATUS
        };
        // console.log('type', type);
        console.log('data', data);
        switch (type) {
            case 'add':
                this.AddClick.emit(data);
                break;

            case 'remove':
                this.RemoveClick.emit(data);
                break;

            case 'edit':
                console.log('inside edit');
                this.EditClick.emit(data);
                break;

            case 'status':
                this.StatusChangeClick.emit(data);
                break;
        }
    }

    ngOnDestroy(): void {
        this.AddClick.unsubscribe();
        this.RemoveClick.unsubscribe();
        this.EditClick.unsubscribe();
        this.StatusChangeClick.unsubscribe();
    }
}

