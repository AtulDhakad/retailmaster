import {Country} from '../../../../models/country';
import {Region} from '../../../../models/region';
import {Status} from '../../../../models/status';
import {TaxRule} from '../../../../models/taxrule';
import {TaxRuleClass} from '../../../../models/taxruleclass';
import {StoresService} from '../../../../services/stores.service';
import {Utils} from '../../../../utils/utils';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stores-taxes',
  templateUrl: './taxes.html'
})
export class StoresTaxesComponent implements OnInit {
  taxRuleList: TaxRule[];
  countryList: Country[];
  regionsList: Region[];
  isAddTaxView: boolean = false;
  selectedTaxRule: TaxRule;
  selectedCountry: string;
  selectedRegion: string;
  selectedCustomerTaxClass: string;
  selectedProductTaxClass: string;
  customerTaxClasses: TaxRuleClass[];
  productTaxClasses: TaxRuleClass[];
  statusArrList: Status[];
  selectedSt: string;
  message: string = '';
  loading: boolean = false;
  constructor(private storeService: StoresService) {}

  ngOnInit(): void {
    this.selectedSt = '';
    this.message = '';
    this.statusArrList = Utils.getStatusArr();
    this.setLoading(true);
    this.getTaxRulesList();
    this.storeService.getCountries().subscribe(list => {
      this.countryList = list;
      this.countryList.sort(function(a, b) {
        if (a.country_name < b.country_name) {
          return -1;
        }
        if (a.country_name > b.country_name) {
          return 1;
        }
        return 0;
      });
    });
    this.storeService.getRegions().subscribe(regionList => {
      this.regionsList = regionList;
    });
    this.productTaxClasses = new Array();
    this.customerTaxClasses = new Array();
    this.storeService.getTaxRuleClass().subscribe(list => {
      for (const trc of list) {
        if (trc.class_type === 'PRODUCT') {
          this.productTaxClasses.push(trc);
        } else {
          this.customerTaxClasses.push(trc);
        }
      }
      this.setLoading(false);
    });
  }
   setLoading(show: boolean): void {
    this.loading = show;
  }
  selectedStatus(status: string): void {
    this.selectedSt = status;
  }
  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, Utils.MILISECONDS);
  }
  getTaxRulesList(): void {
    this.storeService.getTaxRuleList().subscribe(list => {
      this.taxRuleList = list;
      // console.log('tax rule list', list);
      // this.updateTaxRuleForRegion();
    });
  }
  onSelectedCountry(ct: string): void {
    this.selectedCountry = ct;
  }
  //  onSelectedRegion(region: string): void {
  //    this.selectedRegion = region;
  //  }
  onTaxRuleEdit(tr: TaxRule): void {
    this.selectedTaxRule = tr;
  }
  onSelectedCustomerTaxClass(ctc: string): void {
    this.selectedCustomerTaxClass = ctc;
  }
  onSelectedProductTaxClass(ptc: string): void {
    this.selectedProductTaxClass = ptc;
  }
  openAddTaxRule(): void {
    this.isAddTaxView = true;
  }

  closeAddTaxRule(): void {
    this.isAddTaxView = false;
  }
  onTaxRuleUpdate(): void {
    this.setLoading(true);
    if (this.selectedCountry !== undefined) {
      this.selectedTaxRule.tax_country_id = this.selectedCountry;
    }
    if (this.selectedSt !== undefined) {
      this.selectedTaxRule.is_active = this.selectedSt;
    }
    //    if (this.selectedRegion !== undefined) {
    //      this.selectedTaxRule.region_name = this.regionsList.find(item => item.region_id === this.selectedRegion).default_name;
    //      this.selectedTaxRule.tax_region_id = this.selectedRegion;
    //    }
    if (this.selectedCustomerTaxClass !== undefined) {
      this.selectedTaxRule.customer_tax_class = this.selectedCustomerTaxClass;
    }
    if (this.selectedProductTaxClass !== undefined) {
      this.selectedTaxRule.product_tax_class = this.selectedProductTaxClass;
    }
    // console.log('customer tax class');
    // console.log(this.selectedCustomerTaxClass)
    // console.log('product tax class');
    // console.log(this.selectedProductTaxClass)
    this.storeService.updateTaxRule(this.selectedTaxRule).subscribe(taxRule => {
      this.selectedTaxRule = taxRule;
      this.setLoading(false);
      this.getTaxRulesList();
      this.showMessage('Tax Rule updated successfully');
    });
  }
  onTaxRuleSave(event: any): void {
    this.getTaxRulesList();
    this.closeAddTaxRule();
    this.showMessage('Tax Rule saved successfully');
  }
}
