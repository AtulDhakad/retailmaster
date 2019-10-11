import {Store} from '../../../../../models/store';
import {StoreConfiguration} from '../../../../../models/storeconfiguration';
import {StoreGroup} from '../../../../../models/storegroup';
import {WebsiteStoreGroupList} from '../../../../../models/websitestoregrouplist';
import {StoresService} from '../../../../../services/stores.service';
import {Component, Output, EventEmitter, OnDestroy, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-stores-add-edit-store-view',
  templateUrl: './add-edit-store-view.html',
})
export class StoresAddEditStoreViewComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSaveStoreEvent: EventEmitter<Store> = new EventEmitter<Store>();
  @Output() onUpdateStoreEvent: EventEmitter<Store> = new EventEmitter<Store>();
  @Output() onDeleteStoreEvent: EventEmitter<Store> = new EventEmitter<Store>();
  @Input() isEdit: boolean = false;
  @Input() selectedStoreConfiguration: StoreConfiguration;
  @Input() storeGroupList: StoreGroup[];
  seletedStGroupid: string;
  selectedStore: Store;
  loading: boolean = false;
  constructor(private storeService: StoresService) {}
  setLoading(show: boolean): void {
    this.loading = show;
  }
  closePanel(): void {
    this.onClose.emit(false);
  }
  ngOnInit(): void {
    this.selectedStore = new Store();
    if (this.selectedStoreConfiguration !== null &&
      this.selectedStoreConfiguration !== undefined && this.selectedStoreConfiguration !== undefined
      && this.selectedStoreConfiguration.store_id !== undefined) {
      this.setLoading(true);
      this.storeService.getStoreById(this.selectedStoreConfiguration.store_id).subscribe(store => {
        this.selectedStore = store[0] as Store;
        this.setLoading(false);
      });
    }
  }
  saveStoreView(st: Store): void {
    if (this.seletedStGroupid !== undefined) {
      st.group_id = this.seletedStGroupid;
    }
    st.is_active = 1;
    st.sort_order = 0;
    this.setLoading(true);
    if (st.store_id === undefined || st.store_id === '0') {
      this.storeService.saveStoreView(st).subscribe(res => {
        this.onSaveStoreEvent.emit(res);
      });
    } else {
      this.storeService.updateStoreViews(st).subscribe(res => {
        this.onUpdateStoreEvent.emit(res);
      });
    }
  }
  deleteStoreview(st: Store): void {
    this.setLoading(true);
    this.storeService.deleteStoreview(st).subscribe(res => {
      this.onDeleteStoreEvent.emit(res);
    });
  }
  resetStoreview(): void {

  }
  selectedStoreGroup(storeGrpid: string): void {
    this.seletedStGroupid = storeGrpid;
  }
}
