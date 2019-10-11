import {Bank} from '../../../../models/bank';
import { Status } from '../../../../models/status';
import {StoresService} from '../../../../services/stores.service';
import { Utils } from '../../../../utils/utils';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stores-banks',
  templateUrl: './banks.html'
})
export class StoresBanksComponent implements OnInit {
  banks: Bank[];
  selectedBank: Bank;
  newBank: Bank;
  selectedBankList: Bank[];
  statusArrList: Status[];
  message: string;
  selectedSt: string;
  loading: boolean = false;
  constructor(private storeService: StoresService) {
  }
  ngOnInit(): void {
    this.message = '';
    this.statusArrList = Utils.getStatusArr();
    this.newBank = new Bank();
    this.setLoading(true);
    this.getBankList();
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  selectedStatus(status: string): void {
    this.selectedSt = status;
  }
  getBankList(): void {
    this.storeService.getBankList().subscribe(banklist => {
      this.banks = banklist;
      this.selectedBankList = new Array();
      this.setLoading(false);
    });
  }
//  onCheckBoxChange(bnk: Bank, isChecked: boolean): void {
//    if (isChecked) {
//      this.banks.find(item => item.bank_id === bnk.bank_id).is_active = '1';
//      this.selectedBankList.push(bnk);
//    } else {
//      this.banks.find(item => item.bank_id === bnk.bank_id).is_active = '0';
//      const index = this.selectedBankList.findIndex(item => item.bank_id === bnk.bank_id);
//      this.selectedBankList.splice(index, 1);
//    }
//    // console.log(this.selectedBankList);
//    // console.log(this.banks);
//  }
//  onBankActivate(): void {
//    this.spinnerService.show()
//    for (const bnk of this.selectedBankList) {
//      bnk.is_active = '1';
//    }
//    this.storeService.setBankSelected(this.selectedBankList).subscribe(banklist => {
//      this.banks = banklist
//      this.selectedBankList = new Array();
//      this.spinnerService.hide();
//    });
//  }
//  onBankDeactivate(): void {
//    this.spinnerService.show()
//    for (const bnk of this.selectedBankList) {
//      bnk.is_active = '0';
//    }
//    this.storeService.setBankSelected(this.selectedBankList).subscribe(banklist => {
//      this.banks = banklist
//      this.selectedBankList = new Array()
//      this.spinnerService.hide()
//    });
//  }
  onBankDelete(): void {
    this.setLoading(true);
    this.selectedBankList = new Array();
    this.selectedBankList.push(this.selectedBank);
    this.storeService.deleteSelectedBank(this.selectedBankList).subscribe(banklist => {
      this.banks = banklist;
      this.selectedBankList = new Array();
      this.setLoading(false);
      this.showMessage('Bank deleted successfully');
    });
  }
    showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {this.message = ''; }, Utils.MILISECONDS);
  }
  onBankSelected(bnk: Bank): void {
    this.selectedBank = bnk;
    this.selectedSt = bnk.is_active;
  }
  onUpdateBank(): void {
    this.setLoading(true);
    this.selectedBank.is_active = this.selectedSt;
    this.storeService.updateBank(this.selectedBank).subscribe(bank => {
      this.getBankList();
      this.showMessage('Bank updated successfully');
    });
  }
  OnSaveBank(): void {
    this.setLoading(true);
    this.newBank.is_active = this.selectedSt;
    this.storeService.saveBank(this.newBank).subscribe(bank => {
      // console.log(bank);
      this.newBank = new Bank();
      this.getBankList();
      this.showMessage('Bank saved successfully');
    });
  }
}
