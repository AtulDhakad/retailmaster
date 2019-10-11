import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { RMTreeViewComponent } from './rm-treeview.component';
import { RMUITreeComponent } from './rm-ui-tree.component';


import { MultiselectDropdownComponent, MultiSelectSearchFilter } from './rm-multiselect-dropdown.component';
import { TaginputitemComponent } from './tag-input/taginputitem/taginputitem.component';
import { TaginputComponent } from './tag-input/taginput/taginput.component';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    OrderModule
  ],
  declarations: [
    RMTreeViewComponent,
    TaginputComponent,
    MultiselectDropdownComponent,
    MultiSelectSearchFilter,
    RMUITreeComponent,
    TaginputitemComponent,
    TaginputComponent
  ],
  exports: [
    RMTreeViewComponent,
    TaginputComponent,
    TaginputitemComponent,
    MultiselectDropdownComponent,
    MultiSelectSearchFilter,
    RMUITreeComponent
  ],
  providers: []
})
export class RMModule { }
