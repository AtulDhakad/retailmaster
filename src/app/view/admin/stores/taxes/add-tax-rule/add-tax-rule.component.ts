import {Country} from '../../../../../models/country';
import {Region} from '../../../../../models/region';
import {Status} from '../../../../../models/status';
import {TaxRule} from '../../../../../models/taxrule';
import {TaxRuleClass} from '../../../../../models/taxruleclass';
import {StoresService} from '../../../../../services/stores.service';
import {Utils} from '../../../../../utils/utils';
import {Component, Output, EventEmitter, OnDestroy, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stores-add-tax-rule',
  templateUrl: './add-tax-rule.html'
})
export class StoresAddTaxRuleComponent implements OnDestroy, OnInit {

  @Input() countryList: Country[];
  //  @Input() regionsList: Region[];
  @Input() customerTaxClasses: TaxRuleClass[];
  @Input() productTaxClasses: TaxRuleClass[];
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<TaxRule> = new EventEmitter<TaxRule>();
  selectedCountry: string;
  selectedRegion: string;
  newTaxRule: TaxRule;
  selectedCustomerTaxClass: string;
  selectedProductTaxClass: string;
  statusArrList: Status[];
  selectedSt: string;
  loading: boolean = false;
  constructor(private storeService: StoresService) {}

  closeAddTaxRule(): void {
    this.onClose.emit(false);
  }
  ngOnInit(): void {
    this.selectedSt = '';
    this.statusArrList = Utils.getStatusArr();
    this.newTaxRule = new TaxRule();
  }
   setLoading(show: boolean): void {
    this.loading = show;
  }
  ngOnDestroy(): void {
    this.onClose.unsubscribe();
  }

  onSelectedCountry(ct: string): void {
    this.selectedCountry = ct;
  }
  selectedStatus(status: string): void {
    this.selectedSt = status;
  }
  //  onSelectedRegion(region: string): void {
  //    this.selectedRegion = region;
  //  }
  onSelectedCustomerTaxClass(ctc: string): void {
    this.selectedCustomerTaxClass = ctc;
  }
  onSelectedProductTaxClass(ptc: string): void {
    this.selectedProductTaxClass = ptc;
  }
  onSaveClick(): void {
    this.setLoading(true);
    this.newTaxRule.tax_postcode = '0';
    if (this.selectedCountry !== undefined) {
      this.newTaxRule.tax_country_id = this.selectedCountry;
    }
    if (this.selectedSt !== undefined) {
      this.newTaxRule.is_active = this.selectedSt;
    }
    //    if (this.selectedRegion !== undefined) {
    //      this.newTaxRule.tax_region_id = this.selectedRegion;
    //      this.newTaxRule.region_name = this.regionsList.find(item => item.region_id === this.selectedRegion).default_name   //    }

    if (this.selectedCustomerTaxClass !== undefined) {
      this.newTaxRule.customer_tax_class = this.selectedCustomerTaxClass;
    }

    if (this.selectedProductTaxClass !== undefined) {
      this.newTaxRule.product_tax_class = this.selectedProductTaxClass;
    }
    this.storeService.saveTaxRule(this.newTaxRule).subscribe(taxRule => {
      this.onSave.emit(taxRule);
      this.setLoading(false);
    });
  }
}
