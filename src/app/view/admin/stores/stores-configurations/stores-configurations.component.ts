import {RootCategory} from '../../../../models/rootcategory';
import {Store} from '../../../../models/store';
import {StoreConfiguration} from '../../../../models/storeconfiguration';
import {StoreGroup} from '../../../../models/storegroup';
import {Website} from '../../../../models/website';
import {WebsiteStoreGroupList} from '../../../../models/websitestoregrouplist';
import {ConfigService} from '../../../../services/config.service';
import {StoresService} from '../../../../services/stores.service';
import {Utils} from '../../../../utils/utils';
import {FilterPipe} from './filter.pipe';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stores-configurations',
  templateUrl: './stores-configurations.html'
})
export class StoresConfigurationsComponent implements OnInit {
  isMainView: boolean = true;
  loading: boolean = false;
  isWebsite: boolean = false;
  isStore_view: boolean = false;
  isStore: boolean = false;
  isEdit: boolean = false;
  websiteString: string;
  nameString: string;
  rootCategoryString: string;
  viewString: string;
  websiteList: Website[];
  message: string = '';
  // tempStores: Store[];
  tempWebsites: Website[];
  tempStoreGroups: StoreGroup[];
  storeconfigurationlist: StoreConfiguration[];
  rootCategoryList: RootCategory[];
  selectedStoreConfiguration: StoreConfiguration;
  constructor(private service: StoresService) {}
  getStoreConfiguration(): void {
    this.message = '';
    this.service.getStoreConfigurationList().subscribe(res => {
      // console.log('stgrp');
      // console.log(res);
      this.storeconfigurationlist = res[0].StoreConfigurationList;
      this.tempWebsites = res[1].WebsiteList;
      this.tempStoreGroups = res[2].StoreGroupList;
      this.rootCategoryList = res[3].RootCategoryList;
      for (const sc of this.storeconfigurationlist) {
        const storegrp: StoreGroup = this.tempStoreGroups.find(item => item.group_id === sc.group_id);
        if (storegrp !== undefined) {
          const rootCategory: RootCategory = this.rootCategoryList.find(item => item.value === storegrp.root_category_id);
          if (rootCategory !== undefined) {
            sc.root_category = rootCategory.label;
          } else {
            sc.root_category = '';
          }
        } else {
          sc.root_category = '';
        }
      }
      this.setLoading(false);
    });
  }
  ngOnInit() {
    this.setLoading(true);
    this.getStoreConfiguration();
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  openPanel(key: string, isEdit: boolean, sc: StoreConfiguration): void {
    this.isMainView = false;
    this.isStore = false;
    this.isStore_view = false;
    this.isWebsite = false;
    this.isEdit = isEdit;
    this.selectedStoreConfiguration = sc;
    switch (key) {
      case 'website':
        this.isWebsite = true;
        break;
      case 'store':
        this.isStore = true;
        break;
      case 'store_view':
        this.isStore_view = true;
        break;
      default:
        this.isMainView = true;
        break;
    }
    // this.panels[key] = true;
  }

  closePanel(): void {
    this.isStore = false;
    this.isStore_view = false;
    this.isWebsite = false;
    this.isMainView = true;
    this.isEdit = false;
  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
  onWebSiteSave(event: any): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Website saved successfully');
  }
  onWebsiteUpdate(event: any): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Website updated successfully');
  }
  onWebsiteDelete(event: Website): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Website deleted successfully');
  }
  onStoreGroupSave(event: any): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Store group saved successfully');
  }
  onUpdateStoreGroup(event: any): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Store group updated successfully');
  }
  onDeleteStoreGroup(event: any): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Store group deleted successfully');
  }
  onSaveStore(event: any): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Store view saved successfully');
  }
  onUpdateStore(event: any): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Store view updated successfully');
  }
  onDeleteStore(event: any): void {
    this.ngOnInit();
    this.closePanel();
    this.showMessage('Store view deleted successfully');
  }
}
