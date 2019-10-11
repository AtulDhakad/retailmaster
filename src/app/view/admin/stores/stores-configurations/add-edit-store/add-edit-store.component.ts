import {RootCategory} from '../../../../../models/rootcategory';
import {Store} from '../../../../../models/store';
import {StoreConfiguration} from '../../../../../models/storeconfiguration';
import {StoreGroup} from '../../../../../models/storegroup';
import {Website} from '../../../../../models/website';
import {StoresService} from '../../../../../services/stores.service';
import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-stores-add-edit-store',
  templateUrl: './add-edit-store.html'
})
export class StoresAddEditStoreComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSaveStoreGroupEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUpdateStoreGroupEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeleteStoreGroupEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() isEdit: boolean = false;
  @Input() selectedStoreConfiguration: StoreConfiguration;
  @Input() websitelist: Website[];
  @Input() rootCategoryList: RootCategory[];
  selectedWebSiteId: string;
  selectedStoreGroup: StoreGroup;
  selectedRootCategoryId: string;
  selectedRCId: string;
  loading: boolean = false;
  constructor(private storeService: StoresService) {}
  closePanel(): void {
    this.onClose.emit(false);
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  ngOnInit(): void {
    this.selectedStoreGroup = new StoreGroup();
    if (this.selectedStoreConfiguration !== null &&
      this.selectedStoreConfiguration !== undefined && this.selectedStoreConfiguration.group_id !== undefined) {
      this.setLoading(true);
      this.storeService.getStoreGroupById(this.selectedStoreConfiguration.group_id).subscribe(stgrp => {
        this.selectedStoreGroup = stgrp[0] as StoreGroup;
        this.selectedRootCategoryId = stgrp[0].root_category_id;
        this.setLoading(false);
      });
    }
  }

  onSaveClick(str: StoreGroup): void {
    if (this.selectedWebSiteId !== undefined) {
      str.website_id = this.selectedWebSiteId;
    }
    if (this.selectedRCId !== undefined) {
      str.root_category_id = this.selectedRCId;
    }
    // str.root_cetegory_id = 0;
    this.setLoading(true);
    if (str.group_id === undefined || str.group_id === '0') {
      this.storeService.saveStoreGroup(str).subscribe(res => {
        this.onSaveStoreGroupEvent.emit(res);
      });
    } else {
      this.storeService.updateStoreGroup(str).subscribe(res => {
        this.onUpdateStoreGroupEvent.emit(res);
      });
    }
  }
  deleteStore(stgrp: StoreGroup): void {
    this.setLoading(true);
    this.storeService.deleteStore(stgrp).subscribe(res => {
      this.onDeleteStoreGroupEvent.emit(res);
    });
  }
  selectedWs(wsid: string): void {
    this.selectedWebSiteId = wsid;
  }
  selectedRootCategory(rcvalue: string): void {
    this.selectedRCId = rcvalue;
  }
  resetStore(): void {

  }

}

