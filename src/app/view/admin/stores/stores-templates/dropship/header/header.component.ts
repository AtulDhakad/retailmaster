import {Address} from '../../../../../../models/address';
import {Category} from '../../../../../../models/category';
import {Store} from '../../../../../../models/store';
import {DropshipStoreService} from '../../../../../../services/dropship.service';
import {SharedService} from '../../../../../../services/shared.service';
import {Component, Input, Output, OnDestroy, OnChanges, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dropship-store-header',
  templateUrl: './header.html'
})
export class DropshipStoreHeaderComponent implements AfterViewInit {
  fullScreen: boolean = false;
  @Input() searchString: string;
  @Input() view;
  @Input() storeData: any;
  @Input() baseURL: string = '';
  @Input() selectedCustomer: Address = new Address();
  @Output() onCategorySelected: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() onOpenView: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCustomerSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onProductSearch: EventEmitter<string> = new EventEmitter<string>();
  toggleCategories: boolean = false;
  showSearch: boolean = true;
  selectedCategory: any = {
    name: 'Select Category'
  };
  pageData: any = {
    message: 'Free shipping on all orders over RM 300',
    customerName: ''
  };

  @Input() categories: Category[] = [];
  url: string = '';
  constructor(
    private sharedService: SharedService,
    private service: DropshipStoreService) {
    this.sharedService.getFullScreenNotifier().subscribe(res => {
      this.fullScreen = res;
    });
  }
  ngAfterViewInit(): void {
    if (this.view === 'STORE' || this.view.name === 'PRODUCT') {
      this.showSearch = true;
    } else {
      this.showSearch = true;
    }
  }
  toggleFullScreenOn(): void {
    this.fullScreen = !this.fullScreen;
    this.sharedService.emit(this.fullScreen);
  }
  onKeyUp(event: any): void {
    if (event.keyCode === 13) {
      this.onOpenView.emit('home');
      this.onProductSearch.emit(this.searchString);
    }
  }
  onSearchClick() {
    this.onOpenView.emit('home');
    this.onProductSearch.emit(this.searchString);
  }
  changeCategory(category: Category): void {
    this.selectedCategory = category;
    this.toggleCategories = false;
    const modifyName = this.storeData.name.replace(/\s/g, '').toLowerCase();
    // console.log('view name', this.view.name);
    this.onOpenView.emit('home');
    this.onCategorySelected.emit(category);
    // this.router.navigateByUrl(`/stores/external/${modifyName}/home/${category.id}`);
  }
  openView(view: string): void {
    this.onOpenView.emit(view);
  }
  showCats(): any {
    return false;
  }
  onCustomerSearchClick(): void {
    this.onCustomerSearch.emit('CustomerClick');
  }
}
