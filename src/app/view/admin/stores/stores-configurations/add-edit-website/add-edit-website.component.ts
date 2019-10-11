import {Store} from '../../../../../models/store';
import {StoreConfiguration} from '../../../../../models/storeconfiguration';
import {StoreGroup} from '../../../../../models/storegroup';
import {Website} from '../../../../../models/website';
import {StoresService} from '../../../../../services/stores.service';
import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
  OnInit
} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-stores-add-edit-website',
  templateUrl: './add-edit-website.html'
})
export class StoresAddEditWebsiteComponent implements OnInit {
  selStoreId: number;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onWebSiteSave: EventEmitter<Website> = new EventEmitter<Website>();
  @Output() onWebSiteUpdated: EventEmitter<Website> = new EventEmitter<Website>();
  @Output()
  onWebSiteDelete: EventEmitter<Website> = new EventEmitter<Website>();
  @Input() isEdit: boolean = false;
  @Input() selectedStoreConfiguration: StoreConfiguration;
  @Input() storeGroupList: StoreGroup[];
  selectedWebSite: Website;
  loading: boolean = false;
  constructor(private service: StoresService) {}
  closePanel(): void {
    this.onClose.emit(false);
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  ngOnInit() {
    this.selectedWebSite = new Website();
    if (this.selectedStoreConfiguration !== null && this.selectedStoreConfiguration !== undefined
      && this.selectedStoreConfiguration.website_id !== undefined) {
      this.setLoading(true);
      this.service.getWebsiteById(this.selectedStoreConfiguration.website_id).subscribe(ws => {
        this.selectedWebSite = ws[0] as Website;
        this.setLoading(false);
      });
    }
  }
  onSave(sws: Website): void {
    if (this.selStoreId !== undefined) {
      sws.default_group_id = this.selStoreId.toString();
    }
    this.setLoading(true);
    if (sws.website_id === undefined || sws.website_id === '0') {
      this.service.saveWebSite(sws).subscribe(res => {
        this.onWebSiteSave.emit(res);
      });
    } else {
      this.service.updateWebSite(sws).subscribe(res => {
        this.onWebSiteUpdated.emit(res);
      });
    }
  }
  deleteWebsite(): void {
    this.setLoading(true);
    this.service.deleteWebsite(this.selectedWebSite).subscribe(res => {
      this.onWebSiteDelete.emit(this.selectedWebSite);
    });
  }
  resetWebsite(): void {
    // this.storeService.resetWebsite()
  }
  selectedDefaultSt(stid: number): void {
    this.selStoreId = stid;
  }
}
