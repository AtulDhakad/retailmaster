import {Currency} from '../../../../models/currency';
import {CurrencyModel} from '../../../../models/currencymodel';
import {Status} from '../../../../models/status';
import {StoresService} from '../../../../services/stores.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stores-currencies',
  templateUrl: './currencies.html'
})
export class StoresCurrenciesComponent implements OnInit {

  currencyList: Currency[];
  selectedCurrency: Currency;
  newCurrency: Currency;
  tempCurrency: CurrencyModel[];
  tempNumber: number = 100.235;
  message: string;
  loading: boolean = false;
  constructor(private storeService: StoresService) {}
  ngOnInit(): void {
    this.tempCurrency = [];
    this.message = '';
    this.newCurrency = new Currency();
    this.setLoading(true);
    this.getCurrencyList();
    // this.getLocalList();
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  getLocalList(): void {
    this.storeService.getLocalList().subscribe(list => {
      // console.log(list);
      for (const key in list) {
        if (key) {
          // console.log('key', key);
          // console.log('list[key]', list[key]);
          this.tempCurrency.push(list[key]);
        }
      }
    });
  }
  getCurrencyList(): void {
    this.storeService.getCurrencyList().subscribe(list => {
      this.currencyList = list
      this.setLoading(false);
    });
  }
  onCurrencySelected(cur: Currency): void {
    this.selectedCurrency = cur;
  }
  onUpdateCurrency(): void {
    // console.log(this.selectedCurrency);
    this.setLoading(true);
    this.storeService.updateCurrency(this.selectedCurrency).subscribe(currency => {
      // console.log(Currency);
      this.getCurrencyList();
      this.showMessage('Currency updated successfully');
    });
  }
  OnSaveCurrency(): void {
    this.setLoading(true);
    this.storeService.saveCurrency(this.newCurrency).subscribe(currency => {
      // console.log(currency);
      this.newCurrency = new Currency();
      this.getCurrencyList();
      this.showMessage('Currency saved successfully');
    });
  }
  onCurrencyDelete(): void {
    this.setLoading(true);
    this.storeService.deleteSelectedCurrency(this.selectedCurrency.id).subscribe(list => {
      this.currencyList = list
      this.setLoading(false);
      this.showMessage('Currency deleted successfully');
    });
  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
}
