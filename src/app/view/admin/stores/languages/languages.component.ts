import {Language} from '../../../../models/language';
import {Status} from '../../../../models/status';
import {StoresService} from '../../../../services/stores.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stores-languages',
  templateUrl: './languages.html'
})
export class StoresLanguagesComponent implements OnInit {
  languageList: Language[];
  selectedLanguage: Language;
  newLanguage: Language;
  selectedLanguageList: Language[];
  statusArrList: Status[];
  message: string;
  selectedSt: string;
  loading: boolean = false;
  constructor(private storeService: StoresService) {
  }
  ngOnInit(): void {
    this.statusArrList = Utils.getStatusArr();
    this.message = '';
    this.selectedSt = '';
    this.newLanguage = new Language();
    this.setLoading(true);
    this.getLanguageList();
  }
  setLoading(show: boolean): void {
    this.loading = show;
  }
  //  onCheckBoxChange(lang: Language, isChecked: boolean): void {
  //    if (isChecked) {
  //      this.languageList.find(item => item.lang_id === lang.lang_id).is_active = '1';
  //      this.selectedLanguageList.push(lang);
  //    } else {
  //      this.languageList.find(item => item.lang_id === lang.lang_id).is_active = '0';
  //      const index = this.selectedLanguageList.findIndex(item => item.lang_id === lang.lang_id);
  //      this.selectedLanguageList.splice(index, 1);
  //    }
  //    // console.log(this.selectedLanguageList);
  //    // console.log(this.languageList);
  //  }
  selectedStatus(status: string): void {
    this.selectedSt = status;
  }
  getLanguageList(): void {
    this.storeService.getLanguageList().subscribe(languageList => {
      // console.log('languageList');
      // console.log(languageList);
      this.languageList = languageList;
      this.selectedLanguageList = new Array();
      this.setLoading(false);
      this.selectedSt = '';
    });
  }
  onLanguageSelected(language: Language): void {
    this.selectedLanguage = language;
    this.selectedSt = language.is_active;
  }
  OnSaveLanguage(): void {
    this.setLoading(true);
    this.newLanguage.is_active = this.selectedSt;
    this.storeService.saveLanguage(this.newLanguage).subscribe(language => {
      // console.log(language);
      this.newLanguage = new Language();
      this.getLanguageList();
      this.selectedSt = '';
      this.showMessage('Language saved successfully');
    });
  }
  onUpdateLanguage(): void {
    this.setLoading(true);
    // console.log(this.selectedLanguage);
    this.selectedLanguage.is_active = this.selectedSt;
    this.storeService.updateLanguage(this.selectedLanguage).subscribe(language => {
      // console.log(language);
      this.getLanguageList();
      this.selectedSt = '';
      this.showMessage('Language updated successfully');
    });
  }
  //  onLanguageActivate(): void {
  //    this.spinnerService.show();
  //    if (this.selectedLanguageList !== undefined) {
  //      for (const cur of this.selectedLanguageList) {
  //        cur.is_active = '1';
  //      }
  //      this.storeService.setLanguageSelected(this.selectedLanguageList).subscribe(list => {
  //        this.languageList = list
  //        this.selectedLanguageList = new Array()
  //        this.spinnerService.hide();
  //      });
  //    }
  //  }
  //  onLanguageDeactivate(): void {
  //    this.spinnerService.show();
  //    for (const cur of this.selectedLanguageList) {
  //      cur.is_active = '0';
  //    }
  //    this.storeService.setLanguageSelected(this.selectedLanguageList).subscribe(list => {
  //      this.languageList = list
  //      this.selectedLanguageList = new Array();
  //      this.spinnerService.hide();
  //    });
  //  }
  onLanguageDelete(): void {
    this.setLoading(true);
    this.selectedLanguageList.push(this.selectedLanguage);
    this.storeService.deleteSelectedLanguage(this.selectedLanguageList).subscribe(list => {
      this.languageList = list;
      this.selectedLanguageList = new Array();
      this.setLoading(false);
      this.selectedSt = '';
      this.showMessage('Language deleted successfully');

    });
  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
}
